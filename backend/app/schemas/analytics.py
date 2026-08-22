from typing import List
from pydantic import BaseModel

class CategorySpending(BaseModel):
    category: str
    amount: float
    percentage: float

class MonthlySpending(BaseModel):
    month: str
    year: int
    amount: float

class AnalyticsSummary(BaseModel):
    total_spending: float
    current_month_spending: float
    expense_count: int
    average_expense: float
    highest_expense: float

class AnalyticsDashboard(BaseModel):
    summary: AnalyticsSummary
    category_breakdown: List[CategorySpending]
    monthly_trend: List[MonthlySpending]
    insights: List[str]