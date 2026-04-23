'use client';

import { SlidersHorizontal, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useMessages } from '@/features/admin/messages/hooks/useMessages';
import MessageFilters from '@/features/admin/messages/components/MessageFilters';
import MessageTable from '@/features/admin/messages/components/MessageTable';
import Pagination from '@/components/tabels/Pagination';

export default function ManageMessages() {
  const {
    messages,
    loading,
    filters,
    setFilter,
    total,
    totalPages,
    toggleReadStatus,
    deleteMessage,
  } = useMessages();

  const handleLimitChange = (limit: number) => {
    setFilter('limit', limit);
    setFilter('page', 1);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 space-y-6 transition-colors duration-300">
      {/* HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 text-blue-600 rounded-xl dark:bg-blue-500/20 dark:text-blue-400">
            <Inbox size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Messages
            </h1>
            <p className="text-sm text-slate-500 dark:text-white/50">
              You have {total} total contact submissions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            <SlidersHorizontal size={14} className="text-blue-500" />
            Management View
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="space-y-6">
        <MessageFilters filters={filters} setFilter={setFilter} />

        <div
          className={cn(
            'transition-opacity duration-300',
            loading ? 'opacity-50 pointer-events-none' : 'opacity-100',
          )}
        >
          <MessageTable
            messages={messages}
            loading={loading}
            onToggleReadStatus={toggleReadStatus}
            onDelete={deleteMessage}
          />
        </div>

        <footer className="pt-2 border-t border-slate-200 dark:border-white/5">
          <Pagination
            page={filters.page}
            limit={filters.limit}
            total={total}
            totalPages={totalPages}
            onPageChange={(p) => setFilter('page', p)}
            onLimitChange={handleLimitChange}
          />
        </footer>
      </main>
    </div>
  );
}
