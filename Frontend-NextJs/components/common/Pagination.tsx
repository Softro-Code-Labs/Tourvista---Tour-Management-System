'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  limit: number;
  limits?: number[];
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  limit,
  limits,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
  className,
}: PaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <footer className="mt-20 p-2 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
      <div
        className={cn(
          'flex flex-col items-center justify-between gap-6 py-6 md:flex-row px-2',
          className,
        )}
      >
        {/* LEFT: COMPACT RESULTS INFO */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="text-slate-900 dark:text-white font-bold">
              {start}-{end}
            </span>
            <span className="mx-1">of</span>
            <span className="text-slate-900 dark:text-white font-bold">
              {total}
            </span>
          </p>
        </div>

        {/* RIGHT: REFINED CONTROLS */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          {/* ROWS PER PAGE */}
          <div className="flex items-center gap-3">
            <p className="text-[12px] font-black uppercase tracking-widest text-slate-400">
              Rows
            </p>
            <Select
              value={`${limit}`}
              onValueChange={(value) => onLimitChange(Number(value))}
            >
              <SelectTrigger className="h-9 w-[75px] rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-xs cursor-pointer focus:ring-blue-500/20">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent
                side="top"
                className="rounded-xl border-slate-200 dark:border-slate-800"
              >
                {(limits || [10, 25, 50, 100]).map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={`${pageSize}`}
                    className="text-xs font-medium cursor-pointer rounded-lg"
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* PAGE INDICATOR & NAVIGATION */}
          <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/40 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/30">
            {/* FIRST / PREV */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="hidden h-8 w-8 p-0 lg:flex rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 transition-all cursor-pointer"
                onClick={() => onPageChange(1)}
                disabled={page === 1}
              >
                <ChevronsLeft size={16} strokeWidth={2.5} />
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 transition-all cursor-pointer"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </Button>
            </div>

            {/* PAGE NUMBER */}
            <div className="px-3 min-w-[80px] text-center">
              <span className="text-[11px] font-black uppercase tracking-tighter text-slate-400 block leading-none mb-0.5">
                Page
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {page}{' '}
                <span className="text-slate-400 font-medium">
                  / {totalPages}
                </span>
              </span>
            </div>

            {/* NEXT / LAST */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 transition-all cursor-pointer"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </Button>
              <Button
                variant="ghost"
                className="hidden h-8 w-8 p-0 lg:flex rounded-lg hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 transition-all cursor-pointer"
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
              >
                <ChevronsRight size={16} strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
