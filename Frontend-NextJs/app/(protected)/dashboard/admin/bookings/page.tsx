'use client';

import { CalendarCheck, SlidersHorizontal, Clock, Inbox } from 'lucide-react';

export default function ManageBookings() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bookings
          </h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            View and manage customer reservations, statuses, and schedules
          </p>
        </div>

        {/* FILTER PLACEHOLDER */}
        <div className="flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-medium transition-all border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-400">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-gray-100 dark:bg-white/10 uppercase tracking-wider font-bold">
            Soon
          </span>
        </div>
      </div>

      {/* EMPTY STATE AREA */}
      <div className="relative flex items-center justify-center min-h-[55vh] rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-md w-full text-center p-8">
          {/* ICON STACK */}
          <div className="mx-auto mb-6 relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-2xl rotate-6" />
            <div className="relative w-14 h-14 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <CalendarCheck size={28} />
            </div>
          </div>

          {/* TEXT */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Reservations Hub
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-slate-400">
            We are finalizing the reservation engine. Soon you will be able to
            confirm bookings, automate reminder emails, and manage tour capacity
            across different dates and time slots.
          </p>

          {/* PROGRESS INDICATOR */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-indigo-400 border border-gray-200 dark:border-white/10">
              <Clock size={12} className="animate-pulse" />
              Building Management Tools
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
