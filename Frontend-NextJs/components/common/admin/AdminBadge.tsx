'use client';

import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminBadgeProps {
  label?: string;
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
}

export const AdminBadge = ({
  label = 'Admin Console',
  icon: Icon = Sparkles,
  className,
  variant = 'blue',
}: AdminBadgeProps) => {
  // CONFIGURATION MAP
  const variants = {
    emerald:
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    amber:
      'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
    indigo:
      'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    violet:
      'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    green:
      'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    orange:
      'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
    slate:
      'bg-slate-500/10 border-slate-500/20 text-slate-600 dark:text-slate-400',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300',
        'backdrop-blur-[2px] shadow-sm shadow-blue-500/5',
        variants[variant],
        className,
      )}
    >
      {/* ANIMATED GLOW EFFECT */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-current opacity-20 blur-md rounded-full animate-pulse" />
        <Icon size={12} strokeWidth={2.5} className="relative z-10" />
      </div>

      <span className="text-[10px] font-black uppercase tracking-[0.25em] leading-none">
        {label}
      </span>
    </div>
  );
};
