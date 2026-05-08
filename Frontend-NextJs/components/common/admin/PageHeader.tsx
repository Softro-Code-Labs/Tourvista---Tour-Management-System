'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  highlight,
  subtitle,
  icon: Icon,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2',
        className,
      )}
    >
      <div className="flex items-center gap-5">
        {/* ICON BOX */}
        <div
          className={cn(
            'hidden sm:flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl md:rounded-[1.75rem]',
            'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800',
            'shadow-sm shadow-blue-500/5 dark:shadow-none',
            'relative overflow-hidden group',
          )}
        >
          {/* SUBTLE HOVER BACKGROUND EFFECT */}
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Icon
            size={28}
            className="text-blue-600 dark:text-blue-400 relative z-10 transition-transform duration-500 group-hover:scale-110"
            strokeWidth={2}
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex flex-wrap items-baseline gap-x-2">
            <span>{title}</span>
            {highlight && (
              <span className="text-blue-600 dark:text-blue-400 drop-shadow-sm">
                {highlight}
              </span>
            )}
          </h1>

          <p className="text-sm md:text-[15px] font-medium text-center md:text-left text-slate-500 dark:text-slate-400 max-w-[90%] md:max-w-2xl leading-relaxed">
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
