'use client';

import { useTheme } from 'next-themes';
import { Map, Plus, Clock } from 'lucide-react';

export default function ManageTours() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tour Plans
          </h1>

          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-white/50' : 'text-gray-500'
            }`}
          >
            Create, update, and manage travel packages and tour experiences
          </p>
        </div>

        {/* CTA (disabled for now) */}
        <button
          disabled
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm
            cursor-not-allowed transition

            ${
              isDark
                ? 'bg-white/5 border border-white/10 text-white/40'
                : 'bg-gray-100 border border-gray-200 text-gray-400'
            }
          `}
        >
          <Plus size={16} />
          New Tour (soon)
        </button>
      </div>

      {/* EMPTY STATE */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className={`
            max-w-lg w-full text-center rounded-2xl p-10
            transition-all duration-300

            ${
              isDark
                ? 'bg-white/5 border border-white/10 backdrop-blur-xl'
                : 'bg-white border border-gray-200 shadow-sm'
            }
          `}
        >
          {/* ICON */}
          <div
            className={`
              mx-auto mb-6 flex items-center justify-center
              w-14 h-14 rounded-xl

              ${
                isDark
                  ? 'bg-cyan-500/10 text-cyan-300'
                  : 'bg-blue-100 text-blue-600'
              }
            `}
          >
            <Map size={22} />
          </div>

          {/* TITLE */}
          <h2
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tour Management Coming Soon
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}
          >
            This module will allow you to create and manage tour plans,
            including destinations, pricing, schedules, and availability. Easily
            update or remove plans as your offerings evolve.
          </p>

          {/* STATUS */}
          <div
            className={`
              mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs

              ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white/60'
                  : 'bg-gray-100 border border-gray-200 text-gray-600'
              }
            `}
          >
            <Clock size={12} />
            In Development
          </div>
        </div>
      </div>
    </div>
  );
}
