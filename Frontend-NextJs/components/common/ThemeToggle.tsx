'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

interface ThemeToggleProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function ThemeToggle({
  variant = 'default',
  className = '',
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const variantStyles = {
    default: 'px-4 py-2 min-w-[100px]',
    compact: 'p-2.5',
  };

  return (
    <button
      type="button"
      aria-label="Toggle Color Theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'group relative flex items-center justify-center gap-2 rounded-xl border transition-all duration-300',
        'active:scale-95 cursor-pointer overflow-hidden',
        'bg-slate-100/50 border-slate-200 text-slate-900 hover:bg-slate-200/50',
        'dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10',
        variantStyles[variant],
        className,
      )}
    >
      {/* ICON CONTAINER WITH SPECIALIZED TRANSITION */}
      <div className="relative h-5 w-5 overflow-hidden">
        {!mounted ? (
          <div className="h-5 w-5" />
        ) : (
          <div
            className={clsx(
              'flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
              isDark ? 'translate-y-0' : '-translate-y-5',
            )}
          >
            {/* SUN ICON (TOP) */}
            <div className="flex h-5 w-5 items-center justify-center shrink-0">
              <Sun size={18} className="text-amber-500 fill-amber-500/10" />
            </div>

            {/* MOON ICON (BOTTOM) */}
            <div className="flex h-5 w-5 items-center justify-center shrink-0">
              <Moon
                size={18}
                className="text-blue-500 dark:text-blue-400 fill-slate-700/5 dark:fill-blue-400/10"
              />
            </div>
          </div>
        )}
      </div>

      {/* TEXT LABEL */}
      {variant === 'default' && (
        <span className="text-xs font-bold uppercase tracking-wider">
          {!mounted ? '...' : isDark ? 'Light' : 'Dark'}
        </span>
      )}

      {/* SUBTLE BACKGROUND GLOW ON HOVER */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
}
