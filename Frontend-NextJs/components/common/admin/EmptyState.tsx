'use client';

import { SearchX, Inbox, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'no-data' | 'no-results' | 'error';
  title?: string;
  description?: string;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

export function EmptyState({
  type,
  title,
  description,
  onAction,
  actionText,
  className,
}: EmptyStateProps) {
  // CONFIGURATION MAP
  const config = {
    'no-data': {
      icon: <Inbox className="w-10 h-10 text-blue-500/80" />,
      title: title || 'Empty Dashboard',
      description:
        description || 'No data have been recorded in the system yet.',
      actionLabel: actionText || 'Refresh Data',
      bgClass: 'bg-blue-50/50 dark:bg-blue-500/5',
      iconBorder: 'border-blue-100/50 dark:border-blue-500/10',
    },
    'no-results': {
      icon: <SearchX className="w-10 h-10 text-slate-400" />,
      title: title || 'No Matches Found',
      description:
        description ||
        "We couldn't find anything matching your specific filters.",
      actionLabel: actionText || 'Reset All Filters',
      bgClass: 'bg-slate-50/80 dark:bg-slate-800/40',
      iconBorder: 'border-slate-100 dark:border-slate-700/50',
    },
    error: {
      icon: <XCircle className="w-10 h-10 text-red-500/80" />,
      title: title || 'Something went wrong',
      description:
        description ||
        'Failed to fetch the latest reservations. Please try again.',
      actionLabel: actionText || 'Retry Connection',
      bgClass: 'bg-red-50/50 dark:bg-red-500/5',
      iconBorder: 'border-red-100/50 dark:border-red-500/10',
    },
  };

  const active = config[type];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] px-6 py-12 md:py-20',
        'animate-in fade-in zoom-in duration-500',
        className,
      )}
    >
      {/* ICON WRAPPER */}
      <div
        className={cn(
          'relative flex items-center justify-center w-24 h-24 mb-8 rounded-[2.5rem] border transition-transform hover:scale-105 duration-300',
          active.bgClass,
          active.iconBorder,
        )}
      >
        {/* SUBTLE BACKGROUND GLOW */}
        <div className="absolute inset-0 blur-2xl opacity-20 bg-current rounded-full" />
        <div className="relative z-10">{active.icon}</div>
      </div>

      {/* TEXT CONTENT */}
      <div className="max-w-sm text-center space-y-3">
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {active.title}
        </h3>
        <p className="text-sm md:text-[15px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          {active.description}
        </p>
      </div>

      {/* ACTION BUTTON */}
      {onAction && (
        <div className="mt-10">
          <Button
            onClick={onAction}
            variant="outline"
            className={cn(
              'h-12 px-8 rounded-2xl font-bold text-sm tracking-tight transition-all',
              'border-slate-200 dark:border-slate-800',
              'hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900',
              'active:scale-95 shadow-sm',
            )}
          >
            {type === 'no-data' && <RefreshCw className="mr-2 h-4 w-4" />}
            {active.actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
