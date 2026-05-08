'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverlayLoaderProps {
  label?: string;
  className?: string;
  variant?: 'section' | 'full';
  isMinimal?: boolean;
}

export function OverlayLoader({
  label = 'Loading...',
  className,
  variant = 'section',
  isMinimal = false,
}: OverlayLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        // BASE LAYOUT
        'z-[100] flex flex-col items-center justify-center transition-all duration-500',
        'animate-in fade-in',

        // POSITIONING VARIANTS
        variant === 'full' ? 'fixed inset-0' : 'absolute inset-0',

        // AESTHETIC VARIANTS
        isMinimal
          ? 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-[2px]'
          : 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md',

        className,
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* LAYERED VISUAL DEPTH */}
          <div className="absolute inset-0 scale-150 bg-blue-500/20 dark:bg-blue-400/10 blur-2xl rounded-full animate-pulse" />

          {/* SPINNER */}
          <Loader2
            className="relative z-10 text-blue-600 dark:text-blue-400 animate-spin"
            size={44}
            strokeWidth={1.5}
          />
        </div>

        {label && (
          <div className="space-y-1 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-600 dark:text-slate-300">
              {label}
            </p>
            {/* SUBTLE PROGRESS BAR */}
            <div className="w-12 h-[2px] mx-auto bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-blue-500 animate-[loading-bar_1.5s_infinite_ease-in-out]" />
            </div>
          </div>
        )}
      </div>

      {/* ACCESSIBILITY SCREEN READER TEXT */}
      <span className="sr-only">{label}</span>
    </div>
  );
}
