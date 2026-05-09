'use client';

import * as React from 'react';
import { RotateCcw, CalendarIcon, Filter } from 'lucide-react';
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
import { BookingStatus } from '@/common/enums/booking-status.enum';
import { ReservationFilters } from '../types/reservation.types';
import { ActionButton } from '@/components/common/ActionButton';

interface Props {
  filters: ReservationFilters;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export default function ReservationFilterBar({
  filters,
  onChange,
  onClear,
  isLoading,
}: Props) {
  return (
    <section className="rounded-[2.5rem] p-6 md:p-8 mb-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all">
      {/* 1. TOP HEADER AREA */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-500/10">
            <Filter size={22} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Advanced Filters
            </h2>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Refine bookings by status, timeline, or total amount.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <ActionButton
            text="Clear Filters"
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* STATUS SELECTOR */}
        <FilterGroup label="Booking Status" className="md:col-span-3">
          <Select
            value={filters.status || 'all'}
            onValueChange={(val) =>
              onChange('status', val === 'all' ? undefined : val)
            }
          >
            <SelectTrigger className="!h-12 w-full cursor-pointer rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/50 text-[13px] font-bold ring-offset-transparent focus:ring-1 focus:ring-blue-500/20">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800 p-1.5 shadow-xl">
              <SelectItem value="all" className="rounded-xl font-medium">
                All Reservations
              </SelectItem>
              {Object.values(BookingStatus).map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className="rounded-xl capitalize font-medium"
                >
                  <span className="capitalize">{status.toLowerCase()}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        {/* STAY PERIOD */}
        <FilterGroup label="Stay Period" className="md:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            <DatePickerField
              placeholder="Arrival From"
              date={filters.fromDate ? new Date(filters.fromDate) : undefined}
              setDate={(date) =>
                onChange('fromDate', date ? format(date, 'yyyy-MM-dd') : '')
              }
            />
            <DatePickerField
              placeholder="Departure To"
              date={filters.toDate ? new Date(filters.toDate) : undefined}
              setDate={(date) =>
                onChange('toDate', date ? format(date, 'yyyy-MM-dd') : '')
              }
            />
          </div>
        </FilterGroup>

        {/* BUDGET RANGE */}
        <FilterGroup label="Budget Range" className="md:col-span-4">
          <div className="flex items-center h-12 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700/50 px-4 group focus-within:border-blue-500/30 transition-all">
            <div className="flex items-center flex-1">
              <span className="text-[10px] font-black text-blue-500/60 mr-1.5">
                $
              </span>
              <Input
                type="number"
                placeholder="Min"
                className="!p-2 h-8 border-none bg-transparent focus-visible:ring-0 text-[13px] font-bold p-0 placeholder:text-slate-400"
                value={filters.minTotalAmount || ''}
                onChange={(e) => onChange('minTotalAmount', e.target.value)}
              />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-3" />
            <div className="flex items-center flex-1">
              <span className="text-[10px] font-black text-blue-500/60 mr-1.5">
                $
              </span>
              <Input
                type="number"
                placeholder="Max"
                className="!p-2 h-8 border-none bg-transparent focus-visible:ring-0 text-[13px] font-bold p-0 placeholder:text-slate-400"
                value={filters.maxTotalAmount || ''}
                onChange={(e) => onChange('maxTotalAmount', e.target.value)}
              />
            </div>
          </div>
        </FilterGroup>
      </div>
    </section>
  );
}

/**
 * ATOMIC SUB-COMPONENT
 * HANDLES CONSISTENT LABELING AND SPACING
 */
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
    <div className={cn('flex flex-col gap-2.5', className)}>
      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * ATOMIC SUB-COMPONENT
 * RESPONSIBLE FOR HANDLING DATE PICKER FUNCTIONALITY
 */
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
          <CalendarIcon className="mr-2.5 h-4 w-4 text-blue-500 shrink-0 opacity-70" />
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
