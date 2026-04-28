'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TourFilters } from '../types/tour.types';

interface Props {
  filters: TourFilters;
  onChange: (key: keyof TourFilters, value: any) => void;
  onClear: () => void;
}

export default function TourFilterBar({ filters, onChange, onClear }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
      <div className="grid grid-cols-1 md:flex md:flex-wrap items-center gap-3 p-1">
        {/* 1. KEYWORD SEARCH */}
        <div className="relative md:flex-[2] min-w-full md:min-w-[280px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <Input
            placeholder="Search destination, title, or location..."
            className="pl-12 h-12 rounded-2xl border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-base dark:border-slate-800"
            value={filters.search || ''}
            onChange={(e) => onChange('search', e.target.value)}
          />
        </div>

        {/* 2. PRICE RANGE GROUP */}
        <div className="flex items-center justify-between md:justify-start gap-0 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-1">
          <div className="relative flex items-center flex-1 md:flex-none">
            <span className="px-2 text-[10px] font-black text-slate-400 tracking-tighter">
              $
            </span>
            <Input
              type="number"
              placeholder="Min Price"
              className="pl-2 w-full md:w-28 h-10 border-none bg-transparent focus-visible:ring-0 text-sm font-bold placeholder:font-medium"
              value={filters.minPrice || ''}
              onChange={(e) => onChange('minPrice', e.target.value)}
            />
          </div>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />
          <div className="relative flex items-center flex-1 md:flex-none">
            <span className="px-2 text-[10px] font-black text-slate-400 tracking-tighter">
              $
            </span>
            <Input
              type="number"
              placeholder="Max Price"
              className="pl-2 w-full md:w-28 h-10 border-none bg-transparent focus-visible:ring-0 text-sm font-bold placeholder:font-medium"
              value={filters.maxPrice || ''}
              onChange={(e) => onChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* 3. TOGGLES & ACTIONS */}
        <div className="flex items-center justify-between md:justify-end gap-3 md:ml-auto">
          <div className="flex items-center justify-between md:justify-start gap-3 px-4 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex-1 md:flex-none">
            <Label
              htmlFor="active-filter"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer"
            >
              Live Only
            </Label>
            <Switch
              id="active-filter"
              checked={filters.isActive ?? false}
              onCheckedChange={(val) => onChange('isActive', val || undefined)}
              className="data-[state=checked]:bg-blue-600 cursor-pointer"
            />
          </div>

          {/* RESET BUTTON */}
          <Button
            variant="ghost"
            onClick={onClear}
            className="h-12 px-5 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group cursor-pointer"
          >
            <X
              size={18}
              className="mr-2 group-hover:rotate-90 transition-transform"
            />
            <span className="font-bold text-sm">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
