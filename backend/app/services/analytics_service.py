from datetime import datetime, date
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, desc

from app.models.expense import Expense
from app.schemas.analytics import (
    AnalyticsDashboard, AnalyticsSummary, 
    CategorySpending, MonthlySpending
)

class AnalyticsService:
    @staticmethod
    def get_dashboard_analytics(db: Session, user_id: int) -> AnalyticsDashboard:
        now = datetime.utcnow()
        current_year = now.year
        current_month = now.month

        # Summary Metrics
        total_spending = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
            Expense.user_id == user_id
        ).scalar()

        expense_count = db.query(func.count(Expense.id)).filter(
            Expense.user_id == user_id
        ).scalar()

        avg_expense = total_spending / expense_count if expense_count > 0 else 0.0

        highest_expense = db.query(func.coalesce(func.max(Expense.amount), 0.0)).filter(
            Expense.user_id == user_id
        ).scalar()

        current_month_spending = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
            Expense.user_id == user_id,
            extract('year', Expense.date) == current_year,
            extract('month', Expense.date) == current_month
        ).scalar()

        summary = AnalyticsSummary(
            total_spending=round(total_spending, 2),
            current_month_spending=round(current_month_spending, 2),
            expense_count=expense_count,
            average_expense=round(avg_expense, 2),
            highest_expense=round(highest_expense, 2)
        )

        # Category Breakdown
        cat_query = db.query(
            Expense.category,
            func.sum(Expense.amount).label("cat_total")
        ).filter(
            Expense.user_id == user_id
        ).group_by(Expense.category).order_by(desc("cat_total")).all()

        category_breakdown = [
            CategorySpending(
                category=cat,
                amount=round(amt, 2),
                percentage=round((amt / total_spending * 100), 1) if total_spending > 0 else 0.0
            )
            for cat, amt in cat_query
        ]

        # Monthly Trend (Last 6 Months)
        monthly_raw = db.query(
            extract('year', Expense.date).label('y'),
            extract('month', Expense.date).label('m'),
            func.sum(Expense.amount).label('m_total')
        ).filter(
            Expense.user_id == user_id
        ).group_by('y', 'm').order_by(desc('y'), desc('m')).limit(6).all()

        month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        monthly_trend = [
            MonthlySpending(
                month=month_names[int(m) - 1],
                year=int(y),
                amount=round(amt, 2)
            )
            for y, m, amt in reversed(monthly_raw)
        ]

        # Insights Logic
        insights = []
        if expense_count == 0:
            insights.append("No expenses recorded yet. Start logging expenses to unlock analytics!")
        else:
            if category_breakdown:
                top_cat = category_breakdown[0]
                insights.append(f"**{top_cat.category}** is your largest expense category, accounting for {top_cat.percentage}% of your total spending.")
            
            insights.append(f"Your average expenditure per transaction is **₹{round(avg_expense, 2):,}**.")
            
            # Month over month check
            if len(monthly_trend) >= 2:
                last_m = monthly_trend[-1].amount
                prev_m = monthly_trend[-2].amount
                if prev_m > 0:
                    diff_pct = round(((last_m - prev_m) / prev_m) * 100, 1)
                    if diff_pct > 0:
                        insights.append(f"Your spending increased by **{diff_pct}%** compared to last month.")
                    elif diff_pct < 0:
                        insights.append(f"Great job! Your spending decreased by **{abs(diff_pct)}%** compared to last month.")
                    else:
                        insights.append("Your spending was identical to last month.")

        return AnalyticsDashboard(
            summary=summary,
            category_breakdown=category_breakdown,
            monthly_trend=monthly_trend,
            insights=insights
        )