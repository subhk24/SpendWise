/// <reference types="vite/client" />

import { Expense, ExpensePaginatedResponse, AnalyticsDashboardData, User } from '../types';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const API_URL = 'http://localhost:8000/api';
// ... rest of your code

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('spendwise_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      localStorage.removeItem('spendwise_token');
      localStorage.removeItem('spendwise_user');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'An unexpected error occurred');
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth
  async register(data: Record<string, string>) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<{ access_token: string; user: User }>(res);
  }

  async login(data: Record<string, string>) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<{ access_token: string; user: User }>(res);
  }

  async getMe() {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(res);
  }

  async updateProfile(data: { name: string; email: string }) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: this.getHeaders(),
    body: JSON.stringify(data),
  });

  return this.handleResponse<User>(res);
}

async changePassword(data: {
  current_password: string;
  new_password: string;
}) {
  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: this.getHeaders(),
    body: JSON.stringify(data),
  });

  return this.handleResponse<{ message: string }>(res);
}


  // Expenses
  async getExpenses(params: Record<string, string | number | boolean | undefined>): Promise<ExpensePaginatedResponse> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, String(val));
      }
    });

    const res = await fetch(`${API_URL}/expenses?${query.toString()}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<ExpensePaginatedResponse>(res);
  }

  async createExpense(data: Partial<Expense>): Promise<Expense> {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Expense>(res);
  }

  async updateExpense(id: number, data: Partial<Expense>): Promise<Expense> {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Expense>(res);
  }

  async deleteExpense(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(res);
  }

  // Analytics
  async getAnalyticsDashboard(): Promise<AnalyticsDashboardData> {
    const res = await fetch(`${API_URL}/analytics/dashboard`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<AnalyticsDashboardData>(res);
  }
}

export const api = new ApiClient();