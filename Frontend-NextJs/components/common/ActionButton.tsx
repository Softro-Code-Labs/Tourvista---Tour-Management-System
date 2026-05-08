'use client';

import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  variant?: 'default' | 'secondary' | 'outline' | 'danger' | 'success';
  className?: string;
  form?: string;
  disabled?: boolean;
}

export function ActionButton({
  text,
  icon,
  onClick,
  type = 'button',
  variant = 'default',
  className,
  form,
  disabled,
}: ActionButtonProps) {
  const variantStyles = {
    default: cn(
      'text-white transition-all duration-300',
      'bg-blue-600 shadow-sm',
      'dark:bg-gradient-to-br dark:from-blue-500 dark:to-blue-700 dark:shadow-[0_10px_20px_-5px_rgba(59,130,246,0.5)] dark:border-t dark:border-white/20',
    ),

    secondary: cn(
      'text-white transition-all duration-300',
      'bg-slate-800 shadow-sm',
      'dark:bg-gradient-to-br dark:from-slate-800 dark:to-black dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.4)] dark:border-t dark:border-slate-700',
    ),

    danger: cn(
      'text-white transition-all duration-300',
      'bg-rose-600 shadow-sm',
      'dark:bg-gradient-to-br dark:from-rose-500 dark:to-red-700 dark:shadow-[0_10px_20px_-5px_rgba(225,29,72,0.4)] dark:border-t dark:border-white/10',
    ),

    success: cn(
      'text-white transition-all duration-300',
      'bg-emerald-600 shadow-sm',
      'dark:bg-gradient-to-br dark:from-emerald-400 dark:to-teal-600 dark:shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] dark:border-t dark:border-white/20',
    ),

    outline: cn(
      'bg-transparent transition-all duration-300',
      'border border-slate-200 text-slate-600 hover:bg-slate-50',
      'dark:border-slate-800 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:border-blue-500/50',
    ),
  };

  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      form={form}
      className={cn(
        'group relative h-11 w-full overflow-hidden rounded-xl px-6 transition-all cursor-pointer duration-300',
        'font-black text-[10px] uppercase tracking-[0.2em] antialiased',
        'active:scale-[0.96] hover:-translate-y-0.5',
        variantStyles[variant],
        disabled &&
          'opacity-50 cursor-not-allowed grayscale translate-y-0 shadow-none',
        className,
      )}
    >
      <div className="absolute inset-0 hidden dark:block">
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent_70%)]" />
        <span className="absolute top-0 -left-[100%] h-full w-[50%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[120%]" />
      </div>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {disabled ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon && (
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              {icon}
            </span>
          )
        )}
        <span>{text}</span>
      </span>
    </Button>
  );
}
