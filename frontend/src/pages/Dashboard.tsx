import React, { useEffect, useState } from 'react';
import { Card, CategoryIcon } from '../components/UI';
import { api } from '../services/api';
import { AnalyticsDashboardData, Expense } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  Wallet,
  Calendar,
  Hash,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

/* ---------------------------------------------
   Pink / Rose palette
--------------------------------------------- */

const COLORS = [
  '#ed6f9b',
  '#f5a6bf',
  '#d95786',
  '#f7bfd2',
  '#c94977',
  '#f08eae',
  '#e8a0b8',
  '#b94d75',
];

/* ---------------------------------------------
   Dashboard
--------------------------------------------- */

export const Dashboard: React.FC = () => {
  const [data, setData] =
    useState<AnalyticsDashboardData | null>(null);

  const [recentExpenses, setRecentExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, expenseRes] =
          await Promise.all([
            api.getAnalyticsDashboard(),
            api.getExpenses({
              limit: 5,
              sort_by: 'date',
              sort_order: 'desc',
            }),
          ]);

        setData(analyticsData);
        setRecentExpenses(expenseRes.items);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------------------------------------
     Loading state
  --------------------------------------------- */

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="flex items-center justify-between">
          <div>
            <div className="h-7 w-44 bg-[#f8dce6] rounded-lg" />
            <div className="h-3 w-64 bg-[#f9e8ee] rounded-lg mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-[118px]
                bg-white
                border border-[#f4e3e9]
                rounded-[22px]
              "
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="h-[350px] bg-white border border-[#f4e3e9] rounded-[22px]" />
          <div className="h-[350px] bg-white border border-[#f4e3e9] rounded-[22px]" />
        </div>

        <div className="h-[330px] bg-white border border-[#f4e3e9] rounded-[22px]" />
      </div>
    );
  }

  const summary = data?.summary;

  return (
    <div className="space-y-6 pb-8">

      {/* =========================================
          PAGE INTRO
      ========================================= */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-1">

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[25px] font-bold tracking-tight text-[#51434a]">
              Good to see you!
            </h2>

            <Sparkles className="w-5 h-5 text-[#ed6f9b]" />
          </div>

          <p className="text-sm text-[#a28b94]">
            Here's a little overview of your spending.
          </p>
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-full
            bg-white
            border border-[#f3dce5]
            text-xs
            font-semibold
            text-[#9b7e89]
          "
        >
          <span className="w-2 h-2 rounded-full bg-[#ed6f9b]" />
          Your finances at a glance
        </div>
      </div>

      {/* =========================================
          METRIC CARDS
      ========================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Spent */}
        <Card
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            min-h-[118px]
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              w-24
              h-24
              rounded-full
              bg-[#fff0f5]
            "
          />

          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-[#fff0f5]
              text-[#ed6f9b]
              flex
              items-center
              justify-center
              group-hover:bg-[#ed6f9b]
              group-hover:text-white
              transition-colors
              duration-300
            "
          >
            <Wallet className="w-5 h-5" />
          </div>

          <div className="relative">
            <p className="text-[10px] font-bold text-[#b0959f] uppercase tracking-[0.16em]">
              Total Spent
            </p>

            <h3 className="text-[23px] font-bold text-[#51434a] mt-1">
              {formatCurrency(summary?.total_spending || 0)}
            </h3>
          </div>

          <ArrowUpRight
            className="
              absolute
              right-4
              bottom-4
              w-4
              h-4
              text-[#eab5c7]
            "
          />
        </Card>

        {/* This Month */}
        <Card
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            min-h-[118px]
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              w-24
              h-24
              rounded-full
              bg-[#fff4f7]
            "
          />

          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-[#fff0f5]
              text-[#df5b8a]
              flex
              items-center
              justify-center
              group-hover:bg-[#ed6f9b]
              group-hover:text-white
              transition-colors
              duration-300
            "
          >
            <Calendar className="w-5 h-5" />
          </div>

          <div className="relative">
            <p className="text-[10px] font-bold text-[#b0959f] uppercase tracking-[0.16em]">
              This Month
            </p>

            <h3 className="text-[23px] font-bold text-[#51434a] mt-1">
              {formatCurrency(
                summary?.current_month_spending || 0
              )}
            </h3>
          </div>

          <ArrowUpRight
            className="
              absolute
              right-4
              bottom-4
              w-4
              h-4
              text-[#eab5c7]
            "
          />
        </Card>

        {/* Transactions */}
        <Card
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            min-h-[118px]
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              w-24
              h-24
              rounded-full
              bg-[#fff0f5]
            "
          />

          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-[#fff0f5]
              text-[#d95786]
              flex
              items-center
              justify-center
              group-hover:bg-[#ed6f9b]
              group-hover:text-white
              transition-colors
              duration-300
            "
          >
            <Hash className="w-5 h-5" />
          </div>

          <div className="relative">
            <p className="text-[10px] font-bold text-[#b0959f] uppercase tracking-[0.16em]">
              Transactions
            </p>

            <h3 className="text-[23px] font-bold text-[#51434a] mt-1">
              {summary?.expense_count || 0}
            </h3>
          </div>

          <ArrowUpRight
            className="
              absolute
              right-4
              bottom-4
              w-4
              h-4
              text-[#eab5c7]
            "
          />
        </Card>

        {/* Average */}
        <Card
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            gap-4
            min-h-[118px]
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              w-24
              h-24
              rounded-full
              bg-[#fff0f5]
            "
          />

          <div
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-[#fff0f5]
              text-[#c94977]
              flex
              items-center
              justify-center
              group-hover:bg-[#ed6f9b]
              group-hover:text-white
              transition-colors
              duration-300
            "
          >
            <TrendingUp className="w-5 h-5" />
          </div>

          <div className="relative">
            <p className="text-[10px] font-bold text-[#b0959f] uppercase tracking-[0.16em]">
              Average Expense
            </p>

            <h3 className="text-[23px] font-bold text-[#51434a] mt-1">
              {formatCurrency(
                summary?.average_expense || 0
              )}
            </h3>
          </div>

          <ArrowUpRight
            className="
              absolute
              right-4
              bottom-4
              w-4
              h-4
              text-[#eab5c7]
            "
          />
        </Card>
      </div>

      {/* =========================================
          CHARTS
      ========================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Category Breakdown */}
        <Card className="min-h-[350px]">

          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#51434a]">
                Spending by Category
              </h3>

              <p className="text-xs text-[#b0959f] mt-1">
                Where your money goes
              </p>
            </div>

            <div
              className="
                w-9
                h-9
                rounded-xl
                bg-[#fff0f5]
                flex
                items-center
                justify-center
                text-[#ed6f9b]
              "
            >
              <Wallet className="w-4 h-4" />
            </div>
          </div>

          {data?.category_breakdown &&
          data.category_breakdown.length > 0 ? (
            <div className="h-[275px] mt-3">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={data.category_breakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={67}
                    outerRadius={94}
                    paddingAngle={4}
                    stroke="white"
                    strokeWidth={3}
                  >
                    {data.category_breakdown.map(
                      (_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(val: number) =>
                      formatCurrency(val)
                    }
                    contentStyle={{
                      borderRadius: '14px',
                      border: '1px solid #f3dce5',
                      boxShadow:
                        '0 10px 30px rgba(197,132,157,0.12)',
                      backgroundColor: '#ffffff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[275px]">
              <p className="text-sm text-[#b0959f]">
                No category data to display.
              </p>
            </div>
          )}
        </Card>

        {/* Monthly Trend */}
        <Card className="min-h-[350px]">

          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[16px] font-bold text-[#51434a]">
                Monthly Spending
              </h3>

              <p className="text-xs text-[#b0959f] mt-1">
                Your spending trend over time
              </p>
            </div>

            <div
              className="
                w-9
                h-9
                rounded-xl
                bg-[#fff0f5]
                flex
                items-center
                justify-center
                text-[#ed6f9b]
              "
            >
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          {data?.monthly_trend &&
          data.monthly_trend.length > 0 ? (
            <div className="h-[275px] mt-3">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={data.monthly_trend}
                  margin={{
                    top: 10,
                    right: 8,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke="#f4e4e9"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#bda7b0"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    stroke="#bda7b0"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(val: number) =>
                      formatCurrency(val)
                    }
                    contentStyle={{
                      borderRadius: '14px',
                      border: '1px solid #f3dce5',
                      boxShadow:
                        '0 10px 30px rgba(197,132,157,0.12)',
                      backgroundColor: '#ffffff',
                    }}
                  />

                  <Bar
                    dataKey="amount"
                    fill="#ed6f9b"
                    radius={[8, 8, 2, 2]}
                    maxBarSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[275px]">
              <p className="text-sm text-[#b0959f]">
                No trend data available.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* =========================================
          RECENT EXPENSES
      ========================================= */}

      <Card className="overflow-hidden">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h3 className="text-[16px] font-bold text-[#51434a]">
              Recent Expenses
            </h3>

            <p className="text-xs text-[#b0959f] mt-1">
              Your latest transactions
            </p>
          </div>

          <div
            className="
              px-3
              py-1.5
              rounded-full
              bg-[#fff0f5]
              text-[#d95786]
              text-[10px]
              font-bold
              uppercase
              tracking-wider
            "
          >
            Latest 5
          </div>
        </div>

        {recentExpenses.length > 0 ? (
          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead>
                <tr className="border-b border-[#f4e3e9]">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b0959f]">
                    Title
                  </th>

                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b0959f]">
                    Category
                  </th>

                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b0959f]">
                    Date
                  </th>

                  <th className="py-3 px-4 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-[#b0959f]">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="
                      border-b
                      border-[#f8e9ee]
                      last:border-b-0
                      hover:bg-[#fff8fb]
                      transition-colors
                    "
                  >

                    {/* Title */}
                    <td className="py-4 px-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-xl
                            bg-[#fff0f5]
                            text-[#ed6f9b]
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <CategoryIcon
                            category={expense.category}
                            className="w-4 h-4"
                          />
                        </div>

                        <span className="font-semibold text-[#5b4851]">
                          {expense.title}
                        </span>

                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          px-2.5
                          py-1.5
                          rounded-full
                          text-[10px]
                          font-bold
                          bg-[#fff0f5]
                          text-[#d95786]
                        "
                      >
                        {expense.category}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-[#a28b94] text-xs">
                      {formatDate(expense.date)}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right">

                      <span className="font-bold text-[#51434a]">
                        {formatCurrency(expense.amount)}
                      </span>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ) : (
          <div className="text-center py-12">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-[#fff0f5]
                text-[#ed6f9b]
                flex
                items-center
                justify-center
                mx-auto
                mb-3
              "
            >
              <Wallet className="w-5 h-5" />
            </div>

            <p className="text-sm font-semibold text-[#806b74]">
              No expenses yet
            </p>

            <p className="text-xs text-[#b39ca5] mt-1">
              Add your first expense to get started.
            </p>

          </div>
        )}
      </Card>
    </div>
  );
};