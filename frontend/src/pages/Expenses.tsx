import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Input, CategoryIcon, Toast } from '../components/UI';
import { api } from '../services/api';
import { Expense, CategoryType } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Search, Edit2, Trash2, ArrowUpDown } from 'lucide-react';

const CATEGORIES: (CategoryType | 'All')[] = [
  'All', 'Food', 'Transportation', 'Shopping', 'Bills', 
  'Entertainment', 'Health', 'Education', 'Travel', 
  'Subscriptions', 'Other'
];

export const Expenses: React.FC<{ onOpenEdit: (expense: Expense) => void }> = ({ onOpenEdit }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters & Controls
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryType | 'All'>('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Deletion state
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getExpenses({
        search,
        category: category === 'All' ? undefined : category,
        sort_by: sortBy,
        sort_order: sortOrder,
        page,
        limit: 10,
      });
      setExpenses(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, sortBy, sortOrder, page]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      setDeletingId(id);
      await api.deleteExpense(id);
      setToastMessage('Expense deleted successfully.');
      fetchExpenses();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete expense');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Control Bar */}
      <Card className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>

          <div className="space-y-1">
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value as CategoryType | 'All'); setPage(1); }}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="title">Sort by Title</option>
            </select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3"
              aria-label="Toggle sort order"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Table / Mobile Cards */}
      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-slate-500 text-base">No expenses found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Note</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {expense.title}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          <CategoryIcon category={expense.category} />
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{formatDate(expense.date)}</td>
                      <td className="py-3 px-4 text-slate-500 max-w-xs truncate">{expense.note || '-'}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => onOpenEdit(expense)}
                          className="text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          disabled={deletingId === expense.id}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block md:hidden divide-y divide-slate-200 dark:divide-slate-700/60">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{expense.title}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      <CategoryIcon category={expense.category} className="w-3 h-3" />
                      {expense.category}
                    </span>
                    <span>{formatDate(expense.date)}</span>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button onClick={() => onOpenEdit(expense)} className="text-xs text-emerald-600 font-medium">Edit</button>
                    <button onClick={() => handleDelete(expense.id)} className="text-xs text-rose-600 font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Showing {expenses.length} of {total} expenses
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};