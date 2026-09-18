import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExpenseFormModal } from './components/ExpenseFormModal';

import { Dashboard } from './pages/Dashboard';
import { Expenses } from './pages/Expenses';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Expense } from './types';
import { api } from './services/api';

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading SpendWise...
      </div>
    );
  }

  if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}

  const handleOpenAdd = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: Partial<Expense>) => {
    try {
      if (editingExpense) {
        await api.updateExpense(editingExpense.id, data);
      } else {
        await api.createExpense(data);
      }

      window.location.reload();
    } catch (error) {
      console.error('Failed to save expense:', error);
      alert('Failed to save expense. Please make sure the backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onAddExpenseClick={handleOpenAdd}
        />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ onOpenEdit: handleOpenEdit }} />
        </main>
      </div>

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingExpense}
      />
    </div>
  );
};

const ExpensesWrapper: React.FC = () => {
  const { onOpenEdit } =
    useOutletContext<{
      onOpenEdit: (expense: Expense) => void;
    }>();

  return <Expenses onOpenEdit={onOpenEdit} />;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename="/SpendWise">
          <Routes>
            {/* Login/Register are still available */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main website - authentication temporarily disabled */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpensesWrapper />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />

              {/* Opening the website now goes directly to Dashboard */}
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />
            </Route>

            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
