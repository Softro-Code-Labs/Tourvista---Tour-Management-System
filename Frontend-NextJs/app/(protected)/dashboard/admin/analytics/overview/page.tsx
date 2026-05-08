'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  MapPin,
  Globe,
  Calendar,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
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
import { cn } from '@/lib/utils';

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
  {
    title: 'Total Users',
    value: '1,248',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Tour Plans',
    value: '5',
    icon: MapPin,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Total Income',
    value: '$12,450',
    icon: Globe,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    title: 'Bookings',
    value: '412',
    icon: Calendar,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'Messages',
    value: '12',
    icon: MessageSquare,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time analytics and platform activity overview
          </p>
        </div>

        <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-emerald-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Platform Data
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
        {cards.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl p-5 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                  {item.title}
                </p>
                <h2 className="text-2xl font-bold mt-1 tracking-tight">
                  {item.value}
                </h2>
              </div>
              <div
                className={cn(
                  'p-2 rounded-lg transition-transform group-hover:scale-110',
                  item.bg,
                )}
              >
                <item.icon size={20} className={item.color} />
              </div>
            </div>
            {/* Subtle background glow on hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard
          title="Users Growth"
          icon={TrendingUp}
          dataKey="users"
          color="#3b82f6"
          type="line"
        />
        <ChartCard
          title="Bookings Trend"
          icon={Calendar}
          dataKey="bookings"
          color="#10b981"
          type="bar"
        />
        <ChartCard
          title="Income Flow"
          icon={Globe}
          dataKey="income"
          color="#8b5cf6"
          type="line"
        />
      </div>
    </div>
  );
}

function ChartCard({ title, icon: Icon, dataKey, color, type }: any) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon size={16} className="text-slate-400" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
          {title}
        </h3>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-gray-100 dark:text-white/5"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-gray-100 dark:text-white/5"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
