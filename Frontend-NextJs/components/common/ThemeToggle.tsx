'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

type ThemeToggleProps = {
  variant?: 'default' | 'compact';
};

export default function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'flex items-center justify-center gap-2 rounded-xl border cursor-pointer transition',

        variant === 'default' && 'px-4 py-2',
        variant === 'compact' && 'p-2',

        'bg-black/5 border-gray-200 text-slate-900 hover:bg-black/10',
        'dark:bg-white/10 dark:border-white/10 dark:text-white hover:dark:bg-white/20',
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}

      {variant === 'default' && <span>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
}
