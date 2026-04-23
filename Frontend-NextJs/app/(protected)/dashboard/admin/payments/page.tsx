'use client';

import { SlidersHorizontal, Clock, Wallet } from 'lucide-react';

export default function ManagePayments() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Payments
          </h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Monitor transactions, track revenue, and manage payment records
          </p>
        </div>

        {/* FILTER PLACEHOLDER */}
        <div className="flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-medium transition-all border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-400">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-white/10 uppercase tracking-wider">
            Soon
          </span>
        </div>
      </div>

      {/* EMPTY STATE / COMING SOON SECTION */}
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="relative group max-w-xl w-full text-center rounded-3xl p-8 md:p-12 transition-all duration-300 border bg-white dark:bg-slate-900/50 border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md dark:hover:border-blue-500/30 overflow-hidden">
          {/* Background Decorative Glow (Dark Mode Only) */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-0 dark:group-hover:opacity-100 transition-opacity" />

          {/* ICON STACK */}
          <div className="relative mx-auto mb-8 flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-3xl rotate-6 transition-transform group-hover:rotate-12" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <Wallet size={28} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Payment Analytics In Progress
            </h2>
            <p className="mt-4 text-gray-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              We're building a powerful engine to help you track bookings,
              status updates, and revenue streams in real-time. Soon, you'll be
              able to view detailed transaction histories and export financial
              reports.
            </p>
          </div>

          {/* STATUS BADGE */}
          <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase border bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-slate-400">
            <Clock size={14} className="animate-spin-slow" />
            Active Development
          </div>
        </div>
      </div>
    </div>
  );
}
