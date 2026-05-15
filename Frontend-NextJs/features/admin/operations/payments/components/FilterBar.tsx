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
import { PaymentFilters } from '../types/payments.type';
import { PaymentStatus } from '@/common/enums/payment-status.enum';
import { PaymentType } from '@/common/enums/payment-type.enum';

interface Props {
  filters: PaymentFilters;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function PaymentsFilterBar({
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
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-500/10">
            <Filter size={22} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Curation Tools
            </h2>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Filter Payments and View Analytics
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
        {/* PAYMENT STATUS */}
        <FilterGroup label="Payment Status" className="md:col-span-2">
          <Select
            value={filters.status?.toString() || 'all'}
            onValueChange={(val) =>
              onChange('status', val === 'all' ? undefined : val)
            }
          >
            <SelectTrigger className="!h-12 w-full cursor-pointer rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-[13px] font-bold ring-offset-transparent focus:ring-1 focus:ring-blue-500/20">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800 p-1.5 shadow-xl">
              <SelectItem value="all" className="rounded-xl font-medium">
                All Status
              </SelectItem>
              <SelectItem
                value={PaymentStatus.PENDING}
                className="rounded-xl font-medium text-amber-600"
              >
                Pending
              </SelectItem>
              <SelectItem
                value={PaymentStatus.SUCCESS}
                className="rounded-xl font-medium text-emerald-600"
              >
                Success
              </SelectItem>
              <SelectItem
                value={PaymentStatus.FAILED}
                className="rounded-xl font-medium text-rose-600"
              >
                Failed
              </SelectItem>
              <SelectItem
                value={PaymentStatus.CANCELLED}
                className="rounded-xl font-medium text-slate-600"
              >
                Cancelled
              </SelectItem>
              <SelectItem
                value={PaymentStatus.REFUNDED}
                className="rounded-xl font-medium text-violet-600"
              >
                Refunded
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* PAYMENT TYPE */}
        <FilterGroup label="Payment Type" className="md:col-span-2">
          <Select
            value={filters.type?.toString() || 'all'}
            onValueChange={(val) =>
              onChange('type', val === 'all' ? undefined : val)
            }
          >
            <SelectTrigger className="!h-12 w-full cursor-pointer rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-[13px] font-bold ring-offset-transparent focus:ring-1 focus:ring-blue-500/20">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800 p-1.5 shadow-xl">
              <SelectItem value="all" className="rounded-xl font-medium">
                All Types
              </SelectItem>
              <SelectItem
                value={PaymentType.ADVANCE}
                className="rounded-xl font-medium text-indigo-600"
              >
                Advance
              </SelectItem>
              <SelectItem
                value={PaymentType.FULL}
                className="rounded-xl font-medium text-emerald-500"
              >
                Full
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* BUDGET RANGE */}
        <FilterGroup label="Budget Range" className="md:col-span-4">
          <div className="flex items-center h-12 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/50 px-4 group focus-within:border-blue-500/30 transition-all">
            <div className="flex items-center flex-1">
              <span className="text-[10px] font-black text-emerald-500/60 mr-1.5">
                $
              </span>
              <Input
                type="number"
                placeholder="Min"
                className="!p-2 h-8 border-none bg-transparent focus-visible:ring-0 text-[13px] font-bold p-0 placeholder:text-slate-400"
                value={filters.minAmount || ''}
                onChange={(e) => onChange('minAmount', e.target.value)}
              />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-3" />
            <div className="flex items-center flex-1">
              <span className="text-[10px] font-black text-emerald-500/60 mr-1.5">
                $
              </span>
              <Input
                type="number"
                placeholder="Max"
                className="!p-2 h-8 border-none bg-transparent focus-visible:ring-0 text-[13px] font-bold p-0 placeholder:text-slate-400"
                value={filters.maxAmount || ''}
                onChange={(e) => onChange('maxAmount', e.target.value)}
              />
            </div>
          </div>
        </FilterGroup>

        {/* DATE RANGE */}
        <FilterGroup label="Date Range" className="md:col-span-4">
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
          <CalendarIcon className="mr-2.5 h-4 w-4 text-emerald-500 shrink-0 opacity-70" />
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
