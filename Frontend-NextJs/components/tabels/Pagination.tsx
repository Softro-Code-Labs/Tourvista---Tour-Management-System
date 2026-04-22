'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export default function Pagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  onLimitChange,
}: Props) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 transition-colors text-slate-900 dark:text-white">
      {/* LEFT INFO */}
      <div className="text-sm text-slate-600 dark:text-white/60">
        Showing <span className="font-medium">{start}</span> -{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3">
        {/* LIMIT */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-white/60">
            Rows:
          </span>

          <Select
            value={String(limit)}
            onValueChange={(val) => onLimitChange(Number(val))}
          >
            <SelectTrigger className="w-[80px] dark:bg-white/5 dark:border-white/10 dark:text-white">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PREV */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          className="dark:border-white/10 dark:bg-white/5 dark:text-white"
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        {/* PAGE INFO */}
        <span className="text-sm font-medium text-slate-700 dark:text-white/70">
          {page} / {totalPages}
        </span>

        {/* NEXT */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          className="dark:border-white/10 dark:bg-white/5 dark:text-white"
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
