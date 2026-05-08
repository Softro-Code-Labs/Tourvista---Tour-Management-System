'use client';

import { useState } from 'react';
import {
  Search,
  MapPin,
  Edit3,
  Trash2,
  Ghost,
  X,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/common/ActionButton';
import { AttractionItemsList } from './ItemsList';
import { Attraction } from '../types/attractions.type';
import { cn } from '@/lib/utils';

interface ListProps {
  data: Attraction[];
  isLoading: boolean;
  onEdit: (item: Attraction) => void;
  onDelete: (item: Attraction) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

const ListSkeleton = () => (
  <div className="flex flex-col gap-4 w-full">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-100 dark:border-slate-800 animate-pulse flex items-center justify-between"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 pr-4 border-r border-slate-50 dark:border-slate-800">
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="h-8 w-8 bg-slate-50 dark:bg-slate-800/50 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export default function AttractionList({
  data,
  isLoading,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
}: ListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) return <ListSkeleton />;

  return (
    <div className="space-y-8">
      {/* SEARCH BAR */}
      <div className="relative w-full">
        <Input
          placeholder="Search attractions..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-5 h-14 bg-white rounded-2xl border border-slate-100 shadow-md dark:border-slate-700 dark:bg-slate-900"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <ActionButton
            text={searchValue ? 'Clear' : 'Search'}
            variant={searchValue ? 'danger' : 'default'}
            onClick={() => onSearchChange(searchValue ? '' : searchValue)}
            icon={
              searchValue ? (
                <X size={16} strokeWidth={3} />
              ) : (
                <Search size={16} strokeWidth={3} />
              )
            }
            className="h-10 px-4"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="relative overflow-hidden flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-950 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all duration-500">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative mb-8 p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <Ghost
              className="relative text-slate-300 dark:text-slate-500"
              size={56}
              strokeWidth={1.5}
            />
          </div>

          {searchValue && (
            <>
              <div className="text-center space-y-3 z-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  No matches found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-[320px] font-medium">
                  We couldn't find results for "
                  <span className="text-blue-600 dark:text-blue-400 font-bold italic">
                    {searchValue}
                  </span>
                  "
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => onSearchChange('')}
                className="cursor-pointer mt-8 h-12 px-8 rounded-2xl font-bold flex items-center gap-2"
              >
                <X size={16} strokeWidth={2.5} /> Clear Search
              </Button>
            </>
          )}

          {!searchValue && (
            <>
              <div className="text-center space-y-3 z-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  No attractions
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-[320px] font-medium">
                  You haven't created any attractions yet.
                </p>
              </div>
              <p className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Try adding a new category to get started
              </p>
            </>
          )}
        </div>
      ) : (
        /* LIST CONTENT */
        <div className="flex flex-col gap-4 w-full">
          {data.map((item) => (
            <div
              key={item.id}
              className={cn(
                'group overflow-hidden transition-all duration-500 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800',
                expandedId === item.id
                  ? 'shadow-2xl ring-2 ring-blue-500/10'
                  : 'hover:shadow-md',
              )}
            >
              <div
                className="flex items-center p-4 cursor-pointer select-none"
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
              >
                <div className="flex flex-1 items-center gap-4">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-2xl flex items-center justify-center transition-colors',
                      expandedId === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600',
                    )}
                  >
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-md font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1 pr-4 border-r border-slate-100 dark:border-slate-800">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                      className="cursor-pointer h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Edit3 size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item);
                      }}
                      className="cursor-pointer h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <ChevronDown
                    size={20}
                    strokeWidth={3}
                    className={cn(
                      'transition-transform duration-300',
                      expandedId === item.id
                        ? 'rotate-180 text-blue-600'
                        : 'text-slate-300',
                    )}
                  />
                </div>
              </div>

              {expandedId === item.id && (
                <div className="bg-slate-50/30 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800">
                  <AttractionItemsList attractionId={item.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
