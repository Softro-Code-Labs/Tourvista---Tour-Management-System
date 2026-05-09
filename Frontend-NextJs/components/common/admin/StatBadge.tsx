'use client';

import { LucideIcon, SlidersHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Assuming you have a UI Button component
import { ActionButton } from '../ActionButton';

interface StatBadgeProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  className?: string;
  variant?:
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
  onClick?: () => void;
}

export const StatBadge = ({
  label,
  value,
  unit,
  icon: Icon = SlidersHorizontal,
  className,
  variant = 'blue',
  onClick,
}: StatBadgeProps) => {
  const variantStyles = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    violet: 'text-violet-600 dark:text-violet-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    orange: 'text-orange-600 dark:text-orange-400',
    slate: 'text-slate-600 dark:text-slate-400',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 px-5 py-3 rounded-2xl',
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
        className,
      )}
    >
      <div className="text-right flex flex-col justify-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">
          {label}
        </p>
        <p
          className={cn(
            'text-xs font-bold whitespace-nowrap flex items-center justify-end gap-1.5',
            variantStyles[variant],
          )}
        >
          <span className="tabular-nums">{value}</span>
          {unit && (
            <span className="text-[10px] opacity-80 uppercase tracking-wider">
              {unit}
            </span>
          )}
        </p>
      </div>

      <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 mx-1" />

      {/* CONDITIONAL RENDERING: BUTTON vs ICON */}
      {onClick ? (
        <ActionButton
          text="create new"
          icon={<Plus />}
          onClick={onClick}
          className="flex-1"
        />
      ) : (
        <>
          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl shrink-0">
            <Icon size={18} strokeWidth={2} />
          </div>
        </>
      )}
    </div>
  );
};
