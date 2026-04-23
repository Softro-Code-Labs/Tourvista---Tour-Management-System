'use client';

import * as React from 'react';
import { Search, RotateCcw, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import { MessageFilters as MessageFilterState } from '../types/message.types';

type Props = {
  filters: MessageFilterState;
  setFilter: <K extends keyof MessageFilterState>(
    key: K,
    value: MessageFilterState[K],
  ) => void;
};

export default function MessageFilters({ filters, setFilter }: Props) {
  const handleReset = () => {
    setFilter('search', '');
    setFilter('isRead', 'all');
    setFilter('fromDate', '');
    setFilter('toDate', '');
    setFilter('page', 1);
  };

  const updateFilter = (key: keyof MessageFilterState, value: any) => {
    setFilter(key, value);
    setFilter('page', 1);
  };

  return (
    <div className="rounded-2xl p-5 mb-6 border border-slate-200 bg-white dark:bg-slate-950 dark:border-white/10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Filter Messages
          </h2>
          <p className="text-xs text-slate-500 dark:text-white/40">
            Manage and search your inquiries.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2 text-xs cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* SEARCH */}
        <FilterGroup label="Search" className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-9 bg-slate-50/50 dark:bg-white/5 border-slate-200 dark:border-white/10"
            />
          </div>
        </FilterGroup>

        {/* STATUS */}
        <FilterGroup label="Status">
          <Select
            value={filters.isRead}
            onValueChange={(val) =>
              updateFilter('isRead', val as MessageFilterState['isRead'])
            }
          >
            <SelectTrigger className="w-full cursor-pointer bg-slate-50/50 dark:bg-white/5 border-slate-200 dark:border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Read</SelectItem>
              <SelectItem value="false">Unread</SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* DATE FROM */}
        <FilterGroup label="From Date">
          <DatePickerField
            date={filters.fromDate ? new Date(filters.fromDate) : undefined}
            setDate={(date) =>
              updateFilter('fromDate', date?.toISOString() || '')
            }
          />
        </FilterGroup>

        {/* DATE TO */}
        <FilterGroup label="To Date">
          <DatePickerField
            date={filters.toDate ? new Date(filters.toDate) : undefined}
            setDate={(date) =>
              updateFilter('toDate', date?.toISOString() || '')
            }
          />
        </FilterGroup>
      </div>
    </div>
  );
}

function DatePickerField({
  date,
  setDate,
}: {
  date?: Date;
  setDate: (date?: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full cursor-pointer justify-start text-left font-normal bg-slate-50/50 dark:bg-white/5 border-slate-200 dark:border-white/10',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function FilterGroup({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/30 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}
