'use client';

import * as React from 'react';
import { Search, RotateCcw, CalendarIcon, Filter } from 'lucide-react';
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
    <div className="rounded-[2.5rem] p-7 mb-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-none">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
            <Filter size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Inquiry Filters
            </h2>
            <p className="text-[12px] font-medium text-slate-400">
              Refine your inbox with powerful filters to find messages faster.
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-10 px-5 gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-2xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* SEARCH  */}
        <FilterGroup label="Keyword Search" className="lg:col-span-2">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
            <Input
              placeholder="Search by name, email or content..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="h-12 pl-12 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>
        </FilterGroup>

        {/* STATUS */}
        <FilterGroup label="Inbox Status">
          <Select
            value={filters.isRead}
            onValueChange={(val) =>
              updateFilter('isRead', val as MessageFilterState['isRead'])
            }
          >
            <SelectTrigger className="w-full py-5.5 rounded-2xl cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-1">
              <SelectItem
                value="all"
                className="cursor-pointer rounded-xl py-2.5"
              >
                All Inquiries
              </SelectItem>
              <SelectItem
                value="true"
                className="cursor-pointer rounded-xl py-2.5 text-blue-600 font-bold"
              >
                Read & Archived
              </SelectItem>
              <SelectItem
                value="false"
                className="cursor-pointer rounded-xl py-2.5 text-amber-600 font-bold"
              >
                Unread & New
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* DATE RANGE - Grouped visually */}
        <FilterGroup label="Timeframe">
          <div className="flex gap-2">
            <DatePickerField
              placeholder="From"
              date={filters.fromDate ? new Date(filters.fromDate) : undefined}
              setDate={(date) => {
                const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
                updateFilter('fromDate', formattedDate);
              }}
            />
            <DatePickerField
              placeholder="To"
              date={filters.toDate ? new Date(filters.toDate) : undefined}
              setDate={(date) => {
                const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
                updateFilter('toDate', formattedDate);
              }}
            />
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}

function DatePickerField({
  date,
  setDate,
  placeholder = 'Select date',
}: {
  date?: Date;
  setDate: (date?: Date) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'h-12 w-full cursor-pointer justify-start text-left font-bold text-xs rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all focus:ring-4 focus:ring-blue-500/5',
            !date && 'text-slate-400',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
          <span className="truncate">
            {date ? format(date, 'MMM dd') : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl"
        align="center"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-[2rem] p-4"
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
    <div className={cn('flex flex-col gap-3', className)}>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">
        {label}
      </label>
      {children}
    </div>
  );
}
