'use client';

import { Search, SlidersHorizontal, RotateCcw, Banknote } from 'lucide-react';
import { PackageFilters as FilterTypes } from '../types/package.types';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

interface Props {
  filters: FilterTypes;
  onFilterChange: (key: keyof FilterTypes, value: any) => void;
  onClear: () => void;
}

export function PackageSearchFilters({
  filters,
  onFilterChange,
  onClear,
}: Props) {
  const hasActiveFilters =
    filters.search || filters.minPrice || filters.maxPrice;

  return (
    <div className="relative z-10 w-full mb-16">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        {/* SEARCH SECTION */}
        <div className="relative w-full lg:flex-1 group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
            <Search
              className="text-slate-400 group-focus-within:text-blue-500 transition-colors duration-500"
              size={20}
            />
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Where would you like to go?"
            className="w-full pl-16 pr-6 py-5 bg-transparent outline-none text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400/80"
          />
        </div>

        {/* VERTICAL DIVIDER (Desktop Only) */}
        <div className="hidden lg:block h-10 w-[1px] bg-slate-200/60 dark:bg-slate-800/60" />

        {/* PRICE FILTER SECTION */}
        <div className="flex items-center gap-6 px-6 py-2 w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Banknote size={18} className="text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Budget Range ($)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                  className="w-18 bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300"
                />
                <span className="text-slate-300 text-xs">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                  className="w-18 bg-transparent outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 w-full lg:w-auto p-1">
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center justify-center gap-2 px-5 py-4 cursor-pointer rounded-[1.8rem] bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            >
              <RotateCcw size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                Reset
              </span>
            </button>
          )}

          <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 cursor-pointer rounded-[1.8rem] bg-slate-900 dark:bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
            <SlidersHorizontal size={16} />
            Search
          </button>
        </div>
      </div>

      {/* QUICK SUGGESTIONS PILLS */}
      <div className="flex items-center gap-3 mt-6 px-4 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
          Popular:
        </span>
        {['Ella', 'Galle', 'Kandy', 'Sigiriya'].map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterChange('search', tag)}
            className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all whitespace-nowrap"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
