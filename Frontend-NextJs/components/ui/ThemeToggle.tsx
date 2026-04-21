'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

type ThemeToggleProps = {
  variant?: 'default' | 'compact';
};

export default function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-28 rounded-full bg-white/10 animate-pulse" />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        `
        flex items-center justify-center gap-2
        rounded-xl border
        transition-all duration-300
        `,
        variant === 'default' && 'px-4 py-2',
        variant === 'compact' && 'p-2',

        isDark
          ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
          : 'bg-black/5 border-gray-200 text-slate-900 hover:bg-black/10',
      )}
    >
      {isDark ? (
        <>
          <Sun size={16} className="text-yellow-300" />
          {variant === 'default' && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon size={16} className="text-indigo-500" />
          {variant === 'default' && <span>Dark Mode</span>}
        </>
      )}
    </button>
  );
}
