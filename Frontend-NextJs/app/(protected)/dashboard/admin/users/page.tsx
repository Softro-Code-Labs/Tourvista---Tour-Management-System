'use client';

import { useTheme } from 'next-themes';
import { Users, SlidersHorizontal, Clock } from 'lucide-react';

export default function ManageUsers() {
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
            Users
          </h1>

          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-white/50' : 'text-gray-500'
            }`}
          >
            Manage user accounts, roles, and platform access
          </p>
        </div>

        {/* FILTER PLACEHOLDER */}
        <div
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm

            ${
              isDark
                ? 'bg-white/5 border border-white/10 text-white/60'
                : 'bg-gray-100 border border-gray-200 text-gray-600'
            }
          `}
        >
          <SlidersHorizontal size={14} />
          Filters (coming soon)
        </div>
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
                  ? 'bg-blue-500/10 text-blue-300'
                  : 'bg-blue-100 text-blue-600'
              }
            `}
          >
            <Users size={22} />
          </div>

          {/* TITLE */}
          <h2
            className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            User Management Coming Soon
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`mt-2 text-sm leading-relaxed ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}
          >
            This section will display all registered users with filtering by
            using full name or email address. You'll be able to manage access,
            review user details, and monitor platform usage.
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
