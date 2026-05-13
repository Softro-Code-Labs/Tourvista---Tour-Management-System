'use client';

import * as React from 'react';
import {
  RotateCcw,
  CalendarIcon,
  Filter,
  Search,
  Eye,
  Info,
} from 'lucide-react';
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
import { ActionButton } from '@/components/common/ActionButton';
import { UserFilters } from '../types/users.type';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserRole } from '@/common/enums/role.enum';

interface Props {
  filters: UserFilters;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function UsersFilterBar({
  filters,
  onChange,
  onClear,
  isLoading,
}: Props) {
  return (
    <section className="rounded-[2.5rem] p-6 md:p-8 mb-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all">
      {/* 1. HEADER AREA */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-100/50 dark:border-cyan-500/10">
            <Filter size={22} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Curation Tools
            </h2>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Manage guest stories, visibility, and featured highlights.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <ActionButton
            text="Reset Filters"
            variant="danger"
            icon={
              <RotateCcw
                size={14}
                className={cn(isLoading && 'animate-spin')}
              />
            }
            onClick={onClear}
          />
        </div>
      </div>

      {/* 2. MAIN FILTER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* SEARCH BOX */}
        <FilterGroup
          label={
            <div className="flex items-center gap-1.5">
              <span>Search Content</span>
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Info
                      size={12}
                      className="text-slate-400 cursor-help hover:text-blue-500 transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs rounded-xl p-3 bg-slate-900 text-white border-none shadow-2xl">
                    <p className="text-[11px] font-medium leading-relaxed">
                      Find specific users by{' '}
                      <span className="text-blue-400 font-bold">
                        email, firstName, lastName{' '}
                      </span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          }
          className="md:col-span-4"
        >
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Search users..."
              className="h-12 pl-12 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-[13px] font-bold ring-offset-transparent focus-visible:ring-1 focus-visible:ring-blue-500/20"
              value={filters.search || ''}
              onChange={(e) => onChange('search', e.target.value)}
            />
          </div>
        </FilterGroup>

        {/* ROLE STATUS */}
        <FilterGroup label="Public Status" className="md:col-span-3">
          <Select
            value={filters.role?.toString() || 'all'}
            onValueChange={(val) =>
              onChange('role', val === 'all' ? undefined : val)
            }
          >
            <SelectTrigger className="!h-12 w-full cursor-pointer rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-[13px] font-bold ring-offset-transparent focus:ring-1 focus:ring-blue-500/20">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800 p-1.5 shadow-xl">
              <SelectItem value="all" className="rounded-xl font-medium">
                All Users
              </SelectItem>
              <SelectItem
                value={UserRole.ADMIN}
                className="rounded-xl font-medium text-rose-600"
              >
                Admins
              </SelectItem>
              <SelectItem
                value={UserRole.USER}
                className="rounded-xl font-medium text-blue-600"
              >
                Users
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* DATE RANGE */}
        <FilterGroup label="Date Range" className="md:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            <DatePickerField
              placeholder="From"
              date={filters.fromDate ? new Date(filters.fromDate) : undefined}
              setDate={(date) =>
                onChange('fromDate', date ? format(date, 'yyyy-MM-dd') : '')
              }
            />
            <DatePickerField
              placeholder="To"
              date={filters.toDate ? new Date(filters.toDate) : undefined}
              setDate={(date) =>
                onChange('toDate', date ? format(date, 'yyyy-MM-dd') : '')
              }
            />
          </div>
        </FilterGroup>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  children,
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function DatePickerField({
  date,
  setDate,
  placeholder,
}: {
  date?: Date;
  setDate: (d?: Date) => void;
  placeholder: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-12 w-full cursor-pointer justify-start text-left font-bold text-[13px] rounded-2xl transition-all',
            'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50',
            !date ? 'text-slate-400' : 'text-slate-900 dark:text-white',
            'hover:border-blue-500/30 hover:bg-slate-100 dark:hover:bg-slate-800/60',
          )}
        >
          <CalendarIcon className="mr-2.5 h-4 w-4 text-cyan-500 shrink-0 opacity-70" />
          <span className="truncate">
            {date ? format(date, 'MMM dd, yyyy') : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="p-4"
        />
      </PopoverContent>
    </Popover>
  );
}
