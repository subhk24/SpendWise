import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI';
import { api } from '../services/api';
import { AnalyticsDashboardData } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Lightbulb, PieChart as PieChartIcon } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalyticsDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Generating analytics insights...</div>;
  }

  const summary = data?.summary;

  return (
    <div className="space-y-6">
      {/* Smart Insights Banner */}
      <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 rounded-lg text-emerald-600 dark:text-emerald-400">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
              Deterministic Spending Insights
            </h3>
            <ul className="space-y-1.5 text-sm text-emerald-800 dark:text-emerald-300">
              {data?.insights.map((insight, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs font-semibold text-slate-500 uppercase">Highest Expense Single Purchase</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {formatCurrency(summary?.highest_expense || 0)}
          </h3>
        </Card>
        <Card>
          <p className="text-xs font-semibold text-slate-500 uppercase">Average Expense per Transaction</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {formatCurrency(summary?.average_expense || 0)}
          </h3>
        </Card>
        <Card>
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Transactions Recorded</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {summary?.expense_count || 0}
          </h3>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-emerald-600" />
          Category Distribution Analysis
        </h3>
        <div className="space-y-4">
          {data?.category_breakdown.map((cat) => (
            <div key={cat.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">{cat.category}</span>
                <span className="text-slate-500">{formatCurrency(cat.amount)} ({cat.percentage}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};