'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type HeaderVariant =
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'indigo'
  | 'violet'
  | 'blue'
  | 'green'
  | 'cyan'
  | 'orange'
  | 'slate';

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  variant?: HeaderVariant; // Added variant prop
}

export const PageHeader = ({
  title,
  highlight,
  subtitle,
  icon: Icon,
  children,
  className,
  variant = 'blue',
}: PageHeaderProps) => {
  // CONFIGURATION MAP (Matching AdminBadge logic)
  const variants = {
    emerald: {
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      hover: 'bg-emerald-500/5',
    },
    amber: {
      bg: 'bg-amber-500/10 border-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      hover: 'bg-amber-500/5',
    },
    rose: {
      bg: 'bg-rose-500/10 border-rose-500/20',
      text: 'text-rose-600 dark:text-rose-400',
      hover: 'bg-rose-500/5',
    },
    indigo: {
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      text: 'text-indigo-600 dark:text-indigo-400',
      hover: 'bg-indigo-500/5',
    },
    violet: {
      bg: 'bg-violet-500/10 border-violet-500/20',
      text: 'text-violet-600 dark:text-violet-400',
      hover: 'bg-violet-500/5',
    },
    blue: {
      bg: 'bg-blue-500/10 border-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      hover: 'bg-blue-500/5',
    },
    green: {
      bg: 'bg-green-500/10 border-green-500/20',
      text: 'text-green-600 dark:text-green-400',
      hover: 'bg-green-500/5',
    },
    cyan: {
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      text: 'text-cyan-600 dark:text-cyan-400',
      hover: 'bg-cyan-500/5',
    },
    orange: {
      bg: 'bg-orange-500/10 border-orange-500/20',
      text: 'text-orange-600 dark:text-orange-400',
      hover: 'bg-orange-500/5',
    },
    slate: {
      bg: 'bg-slate-500/10 border-slate-500/20',
      text: 'text-slate-600 dark:text-slate-400',
      hover: 'bg-slate-500/5',
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-6',
        className,
      )}
    >
      <div className="flex items-center gap-5">
        {/* ICON BOX */}
        <div
          className={cn(
            'hidden sm:flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl md:rounded-[1.75rem]',
            'border transition-all duration-300',
            currentVariant.bg, // Dynamic Background
            'relative overflow-hidden group',
          )}
        >
          {/* HOVER EFFECT */}
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              currentVariant.hover,
            )}
          />

          <Icon
            size={28}
            className={cn(
              'relative z-10 transition-transform duration-500 group-hover:scale-110',
              currentVariant.text, // Dynamic Icon Color
            )}
            strokeWidth={2.5}
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col items-start space-y-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
            <span>{title}</span>
            {highlight && (
              <span className={cn('drop-shadow-sm', currentVariant.text)}>
                {highlight}
              </span>
            )}
          </h1>

          <p className="text-sm md:text-[15px] font-medium text-left text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* SLOT FOR ACTIONS */}
      {children && (
        <div className="flex items-center gap-3 self-start sm:self-center">
          {children}
        </div>
      )}
    </div>
  );
};
