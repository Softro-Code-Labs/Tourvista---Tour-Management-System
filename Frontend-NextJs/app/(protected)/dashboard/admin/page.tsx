'use client';

import { Users, MapPin, Globe, Calendar, MessageSquare } from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

import { useTheme } from 'next-themes';

/* ---------------- MOCK DATA (realistic) ---------------- */

const monthlyData = [
  { month: 'Jan', users: 320, bookings: 85, income: 2100 },
  { month: 'Feb', users: 280, bookings: 70, income: 1850 },
  { month: 'Mar', users: 410, bookings: 120, income: 3100 },
  { month: 'Apr', users: 390, bookings: 110, income: 2950 },
  { month: 'May', users: 520, bookings: 160, income: 4200 },
  { month: 'Jun', users: 480, bookings: 140, income: 3900 },
  { month: 'Jul', users: 610, bookings: 200, income: 5600 },
  { month: 'Aug', users: 580, bookings: 180, income: 5100 },
  { month: 'Sep', users: 640, bookings: 210, income: 6100 },
  { month: 'Oct', users: 700, bookings: 240, income: 6800 },
  { month: 'Nov', users: 680, bookings: 230, income: 6400 },
  { month: 'Dec', users: 820, bookings: 310, income: 9200 },
];

const cards = [
  { title: 'Total Users', value: '1,248', icon: Users },
  { title: 'Tour Plans', value: '5', icon: MapPin },
  { title: 'Total Income', value: '$12,450', icon: Globe },
  { title: 'Bookings', value: '412', icon: Calendar },
  { title: 'Messages', value: '12', icon: MessageSquare },
];

export default function AdminDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`
        p-10 min-h-screen transition-colors duration-300
        ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}
      `}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>

          <p
            className={
              isDark
                ? 'text-white/40 text-sm mt-1'
                : 'text-slate-500 text-sm mt-1'
            }
          >
            Real-time insights for users, bookings, income and activity
          </p>
        </div>

        <div
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-xs
            border backdrop-blur-xl
            ${
              isDark
                ? 'bg-white/5 border-white/10 text-white/60'
                : 'bg-white border-gray-200 text-slate-600'
            }
          `}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live data
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className={`
                rounded-2xl p-5 transition

                backdrop-blur-xl border

                ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white border-gray-200 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={
                      isDark
                        ? 'text-xs text-white/50'
                        : 'text-xs text-slate-500'
                    }
                  >
                    {item.title}
                  </p>

                  <h2 className="text-xl font-semibold mt-1">{item.value}</h2>
                </div>

                <Icon
                  size={18}
                  className={isDark ? 'text-cyan-300' : 'text-blue-500'}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* USERS */}
        <div
          className={`
            p-6 rounded-2xl border backdrop-blur-xl

            ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }
          `}
        >
          <h3 className="text-sm font-semibold mb-4">Users Growth</h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'}
              />
              <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke={isDark ? '#22d3ee' : '#2563eb'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BOOKINGS */}
        <div
          className={`
            p-6 rounded-2xl border backdrop-blur-xl

            ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }
          `}
        >
          <h3 className="text-sm font-semibold mb-4">Bookings Trend</h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid
                stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'}
              />
              <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip />
              <Bar
                dataKey="bookings"
                fill={isDark ? '#60a5fa' : '#3b82f6'}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* INCOME */}
        <div
          className={`
            p-6 rounded-2xl border backdrop-blur-xl

            ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }
          `}
        >
          <h3 className="text-sm font-semibold mb-4">Income Growth</h3>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid
                stroke={isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'}
              />
              <XAxis dataKey="month" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke={isDark ? '#a78bfa' : '#7c3aed'}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
