from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator

VALID_CATEGORIES = [
    "Food", "Transportation", "Shopping", "Bills", 
    "Entertainment", "Health", "Education", "Travel", 
    "Subscriptions", "Other"
]

class ExpenseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    amount: float = Field(..., gt=0, description="Amount must be greater than zero")
    category: str = Field(...)
    date: date
    note: Optional[str] = Field(None, max_length=500)

    @field_validator("category")
    def validate_category(cls, v):
        if v not in VALID_CATEGORIES:
            raise ValueError(f"Category must be one of {VALID_CATEGORIES}")
        return v

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = None
    date: Optional[date] = None

class ExpenseResponse(ExpenseBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ExpensePaginatedResponse(BaseModel):
    items: List[ExpenseResponse]
    total: int
    page: int
    limit: int
    total_pages: int