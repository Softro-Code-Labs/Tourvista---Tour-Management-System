'use client';

import { Users, SlidersHorizontal, Clock, ShieldCheck } from 'lucide-react';

export default function ManageUsers() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Manage user accounts, roles, and platform access permissions
          </p>
        </div>

        {/* FILTER PLACEHOLDER */}
        <div className="flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-medium border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-400 shadow-sm">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase tracking-widest font-bold">
            Soon
          </span>
        </div>
      </div>

      {/* EMPTY STATE / COMING SOON */}
      <div className="flex items-center justify-center min-h-[55vh]">
        <div className="relative group max-w-xl w-full text-center rounded-3xl p-10 border bg-white dark:bg-slate-900/40 border-gray-200 dark:border-white/10 shadow-sm transition-all hover:shadow-md">
          {/* Decorative Blue Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

          {/* ICON SECTION */}
          <div className="relative mx-auto mb-8 w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-500/10 rounded-full scale-125 animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <ShieldCheck size={30} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Directory is being Prepared
            </h2>
            <p className="mt-4 text-gray-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto text-sm md:text-base">
              Soon you will be able to search for users, assign admin roles,
              reset passwords, and monitor login activity across the entire
              platform.
            </p>
          </div>

          {/* STATUS FOOTER */}
          <div className="mt-10 pt-8 border-t border-gray-50 dark:border-white/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tighter bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-white/10">
              <Clock size={14} className="text-blue-500" />
              Developer Preview Stage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
