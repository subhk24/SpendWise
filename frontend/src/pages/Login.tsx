import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Wallet } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await api.login({ email, password });
      login(res.access_token, res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fff8fb]">
      <Card className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#ed6f9b] rounded-xl text-white mb-2">
  <Wallet className="w-8 h-8 text-white" />
</div>
          {/* <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100"> */}
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back</h2>
          <p className="text-sm text-slate-500">Sign in to your SpendWise account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-600">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="demo@spendwise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
};