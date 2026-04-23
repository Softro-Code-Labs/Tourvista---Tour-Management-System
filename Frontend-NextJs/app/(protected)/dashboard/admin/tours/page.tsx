'use client';

import { Map, Plus, Clock, Compass } from 'lucide-react';

export default function ManageTours() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tour Plans
          </h1>
          <p className="text-sm mt-1 text-gray-500 dark:text-slate-400">
            Create, update, and manage travel packages and tour experiences
          </p>
        </div>

        {/* CTA (disabled for now) */}
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border
            bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 
            text-gray-400 dark:text-white/20 cursor-not-allowed shadow-sm"
        >
          <Plus size={18} />
          New Tour Plan
        </button>
      </div>

      {/* EMPTY STATE CONTAINER */}
      <div className="flex items-center justify-center min-h-[55vh] rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-md w-full text-center p-8 transition-all duration-300">
          {/* ILLUSTRATIVE ICON */}
          <div className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center">
            {/* Background Pulsing Ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-cyan-500/10 animate-pulse" />
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-xl shadow-blue-500/10 text-blue-600 dark:text-cyan-400">
              <Compass size={32} className="animate-spin-slow" />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No Tour Plans Found
            </h2>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-slate-400">
              Your tour management module is currently being finalized. Soon
              you'll be able to orchestrate complex itineraries, set seasonal
              pricing, and manage booking limits from this central hub.
            </p>
          </div>

          {/* STATUS LABEL */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-cyan-400/80 shadow-sm">
              <Clock size={12} />
              Feature In Development
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
