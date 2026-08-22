export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export type CategoryType = 
  | 'Food' 
  | 'Transportation' 
  | 'Shopping' 
  | 'Bills' 
  | 'Entertainment' 
  | 'Health' 
  | 'Education' 
  | 'Travel' 
  | 'Subscriptions' 
  | 'Other';

export interface Expense {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  category: CategoryType;
  date: string;
  note?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpensePaginatedResponse {
  items: Expense[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface CategorySpending {
  category: CategoryType;
  amount: number;
  percentage: number;
}

export interface MonthlySpending {
  month: string;
  year: number;
  amount: number;
}

export interface AnalyticsDashboardData {
  summary: {
    total_spending: number;
    current_month_spending: number;
    expense_count: number;
    average_expense: number;
    highest_expense: number;
  };
  category_breakdown: CategorySpending[];
  monthly_trend: MonthlySpending[];
  insights: string[];
}