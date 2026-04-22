'use client';

import { SlidersHorizontal } from 'lucide-react';

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
    <div className="px-6 py-10 min-h-screen transition-colors bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Messages</h1>

          <p className="text-sm mt-1 text-slate-500 dark:text-white/50">
            Manage contact form submissions
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
          <SlidersHorizontal size={14} />
          Filters
        </div>
      </div>

      {/* FILTERS */}
      <MessageFilters filters={filters} setFilter={setFilter} />

      {/* TABLE */}
      <MessageTable
        messages={messages}
        loading={loading}
        onToggleReadStatus={toggleReadStatus}
        onDelete={deleteMessage}
      />

      {/* PAGINATION */}
      <Pagination
        page={filters.page}
        limit={filters.limit}
        total={total}
        totalPages={totalPages}
        onPageChange={(p) => setFilter('page', p)}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
