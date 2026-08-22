import math
from datetime import date
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc

from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpensePaginatedResponse, ExpenseResponse

class ExpenseService:
    @staticmethod
    def create_expense(db: Session, expense_in: ExpenseCreate, user_id: int) -> Expense:
        db_expense = Expense(
            **expense_in.model_dump(),
            user_id=user_id
        )
        db.add(db_expense)
        db.commit()
        db.refresh(db_expense)
        return db_expense

    @staticmethod
    def get_expense_by_id(db: Session, expense_id: int, user_id: int) -> Optional[Expense]:
        return db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == user_id).first()

    @staticmethod
    def get_expenses_paginated(
        db: Session,
        user_id: int,
        search: Optional[str] = None,
        category: Optional[str] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        sort_by: str = "date",
        sort_order: str = "desc",
        page: int = 1,
        limit: int = 10
    ) -> ExpensePaginatedResponse:
        query = db.query(Expense).filter(Expense.user_id == user_id)

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    Expense.title.ilike(search_pattern),
                    Expense.note.ilike(search_pattern)
                )
            )

        if category and category != "All":
            query = query.filter(Expense.category == category)

        if start_date:
            query = query.filter(Expense.date >= start_date)

        if end_date:
            query = query.filter(Expense.date <= end_date)

        sort_col = getattr(Expense, sort_by, Expense.date)
        if sort_order.lower() == "desc":
            query = query.order_by(desc(sort_col), desc(Expense.id))
        else:
            query = query.order_by(asc(sort_col), asc(Expense.id))

        total = query.count()
        total_pages = math.ceil(total / limit) if limit > 0 else 1
        
        offset = (page - 1) * limit
        items = query.offset(offset).limit(limit).all()

        return ExpensePaginatedResponse(
            items=[ExpenseResponse.model_validate(item) for item in items],
            total=total,
            page=page,
            limit=limit,
            total_pages=total_pages
        )

    @staticmethod
    def update_expense(db: Session, db_expense: Expense, expense_in: ExpenseUpdate) -> Expense:
        update_data = expense_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_expense, field, value)
        
        db.commit()
        db.refresh(db_expense)
        return db_expense

    @staticmethod
    def delete_expense(db: Session, db_expense: Expense) -> None:
        db.delete(db_expense)
        db.commit()