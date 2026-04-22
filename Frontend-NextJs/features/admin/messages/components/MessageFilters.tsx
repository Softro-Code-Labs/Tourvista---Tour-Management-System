'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="rounded-2xl p-5 mb-6 border border-slate-200 bg-white dark:bg-slate-950 dark:border-white/10">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Filter Messages
          </h2>

          <p className="text-sm text-slate-500 dark:text-white/50">
            Search and filter your messages
          </p>
        </div>

        <Button
          variant="outline"
          className="cursor-pointer dark:border-white/10 dark:bg-white/5"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* SEARCH */}
        <div className="lg:col-span-2">
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-white/70">
            Search
          </label>

          <Input
            placeholder="Search by name, email, subject..."
            value={filters.search}
            onChange={(e) => {
              setFilter('search', e.target.value);
              setFilter('page', 1);
            }}
            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-white/70">
            Status
          </label>

          <Select
            value={filters.isRead}
            onValueChange={(val) =>
              setFilter('isRead', val as MessageFilterState['isRead'])
            }
          >
            <SelectTrigger className="w-full bg-white dark:bg-white/5 border-slate-200 dark:border-white/10">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Read</SelectItem>
              <SelectItem value="false">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* FROM */}
        <div>
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-white/70">
            From
          </label>

          <Input
            type="date"
            value={filters.fromDate}
            onChange={(e) => {
              setFilter('fromDate', e.target.value);
              setFilter('page', 1);
            }}
            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10"
          />
        </div>

        {/* TO */}
        <div>
          <label className="text-sm font-medium mb-1 block text-slate-700 dark:text-white/70">
            To
          </label>

          <Input
            type="date"
            value={filters.toDate}
            onChange={(e) => {
              setFilter('toDate', e.target.value);
              setFilter('page', 1);
            }}
            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10"
          />
        </div>
      </div>
    </div>
  );
}
