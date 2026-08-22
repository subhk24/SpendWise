from datetime import date
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.auth.jwt import get_current_user
from app.schemas.expense import (
    ExpenseCreate, ExpenseUpdate, ExpenseResponse, ExpensePaginatedResponse
)
from app.services.expense_service import ExpenseService

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.get("", response_model=ExpensePaginatedResponse)
def get_expenses(
    search: Optional[str] = Query(None, description="Search title or notes"),
    category: Optional[str] = Query(None, description="Filter by category"),
    start_date: Optional[date] = Query(None, description="Filter start date YYYY-MM-DD"),
    end_date: Optional[date] = Query(None, description="Filter end date YYYY-MM-DD"),
    sort_by: str = Query("date", regex="^(date|amount|title)$"),
    sort_order: str = Query("desc", regex="^(asc|desc)$"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ExpenseService.get_expenses_paginated(
        db=db,
        user_id=current_user.id,
        search=search,
        category=category,
        start_date=start_date,
        end_date=end_date,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        limit=limit
    )

@router.post("", response_model=ExpenseResponse, status_code=status.HTTP_201_CREATED)
def create_expense(
    expense_in: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return ExpenseService.create_expense(db=db, expense_in=expense_in, user_id=current_user.id)

@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = ExpenseService.get_expense_by_id(db=db, expense_id=expense_id, user_id=current_user.id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense

@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    expense_in: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = ExpenseService.get_expense_by_id(db=db, expense_id=expense_id, user_id=current_user.id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return ExpenseService.update_expense(db=db, db_expense=expense, expense_in=expense_in)

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = ExpenseService.get_expense_by_id(db=db, expense_id=expense_id, user_id=current_user.id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    ExpenseService.delete_expense(db=db, db_expense=expense)
    return None