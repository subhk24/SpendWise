import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Wallet } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      const res = await api.register({ name, email, password });
      login(res.access_token, res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fff8fb]">
      <Card className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          {/* <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl text-emerald-600 mb-2">
            <Wallet className="w-8 h-8" />
          </div> */}
          <div className="inline-flex p-3 bg-[#ed6f9b] rounded-xl text-white mb-2">
  <Wallet className="w-8 h-8 text-white" />
</div>
          {/* <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100"> */}
          <h2 className="text-2xl font-bold text-slate-900">
            Create an Account</h2>
          <p className="text-sm text-slate-500">Start tracking your personal expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-600">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};