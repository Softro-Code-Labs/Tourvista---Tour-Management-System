'use client';

import { Compass, Search, Plus, ArrowRight } from 'lucide-react';
import { Tour } from '../types/tour.types';
import TourCard from './TourCard';
import { Button } from '@/components/ui/button';

interface TourListProps {
  tours: Tour[];
  totalCount: number;
  onEdit: (tour: Tour) => void;
  onDelete: (tour: Tour) => void;
  onCreate: () => void;
  onResetFilters: () => void;
}

export default function TourList({
  tours,
  totalCount,
  onEdit,
  onDelete,
  onCreate,
  onResetFilters,
}: TourListProps) {
  // CASE 1: TRULY EMPTY INVENTORY (Zero tours in database)
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center p-12 max-w-md">
          {/* Animated Hero Icon */}
          <div className="relative mx-auto mb-10 w-28 h-28 rounded-[2.5rem] bg-white dark:bg-slate-900 flex items-center justify-center shadow-2xl shadow-blue-500/10 text-blue-600 border border-slate-100 dark:border-slate-800 group">
            <Compass
              size={48}
              strokeWidth={1.5}
              className="animate-[spin_20s_linear_infinite] group-hover:text-blue-500 transition-colors"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950 animate-bounce" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            No tours created yet. Let's change that!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm font-medium leading-relaxed">
            Get started by creating your first plan. Showcase your unique tours
            and captivate travelers with unforgettable experiences.
          </p>

          <div className="mt-10 space-y-4">
            <Button
              onClick={onCreate}
              className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer group"
            >
              <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
              Create Your First Plan
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              <span className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
              Quick Start
              <span className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASE 2: FILTERED LIST IS EMPTY (Search mismatch)
  if (tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] bg-slate-50/30 dark:bg-slate-900/10 transition-all animate-in fade-in duration-500">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 group">
          <Search
            size={56}
            className="text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300"
            strokeWidth={1}
          />
        </div>

        <div className="text-center max-w-sm px-6">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            No matches found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-base mt-3 leading-relaxed">
            We couldn't find anything for those filters. Try clearing them to
            see all
            <span className="text-blue-600 dark:text-blue-400 font-bold ml-1">
              {totalCount} available tours
            </span>
            .
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={onResetFilters}
              className="w-full sm:w-auto rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold px-8 h-12 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
            >
              Clear All Filters
            </Button>

            <button
              onClick={onCreate}
              className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
            >
              Or create new
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CASE 3: RENDER THE LIST
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {tours.map((tour, index) => (
        <div
          key={tour.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="transition-all"
        >
          <TourCard tour={tour} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
