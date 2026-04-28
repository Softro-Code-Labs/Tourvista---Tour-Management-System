'use client';

import { useState } from 'react';
import { SlidersHorizontal, Inbox, Sparkles, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/features/admin/messages/hooks/useMessages';
import MessageFilters from '@/features/admin/messages/components/MessageFilters';
import MessageTable from '@/features/admin/messages/components/MessageTable';
import { Message } from '@/features/admin/messages/types/message.types';
import Pagination from '@/components/common/Pagination';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';

export default function ManageMessages() {
  const {
    messages,
    meta,
    loading,
    filters,
    setFilter,
    toggleReadStatus,
    deleteMessage,
    isDeleting,
  } = useMessages();
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    message: Message | null;
  }>({ open: false, message: null });

  const confirmDeletion = async () => {
    if (!deleteDialog.message) return;
    if (await deleteMessage(deleteDialog.message.id))
      setDeleteDialog({ open: false, message: null });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* SYNCED HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <Sparkles size={12} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Communications Hub
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl shadow-blue-500/10 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <Inbox size={32} className="text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Inbox <span className="text-blue-600">Studio</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <Activity size={10} />
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      {meta.total} Total Submissions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  System Status
                </p>
                <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{' '}
                  Live Sync Active
                </p>
              </div>
              <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 mx-1" />
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <SlidersHorizontal size={18} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <MessageFilters filters={filters} setFilter={setFilter} />
          <section
            className={cn(
              'relative transition-all duration-500',
              loading
                ? 'opacity-40 blur-[2px] pointer-events-none'
                : 'opacity-100',
            )}
          >
            <MessageTable
              messages={messages}
              loading={loading}
              onToggleReadStatus={toggleReadStatus}
              onDelete={(m) => setDeleteDialog({ open: true, message: m })}
            />
          </section>
          <footer className="mt-12 p-2 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
            <Pagination
              page={filters.page}
              limit={filters.limit}
              total={meta.total}
              totalPages={meta.totalPages}
              onPageChange={(p) => setFilter('page', p)}
              onLimitChange={(l) => {
                setFilter('limit', l);
                setFilter('page', 1);
              }}
            />
          </footer>
        </main>

        <DeleteConfirmDialog
          isOpen={deleteDialog.open}
          isLoading={isDeleting}
          title={deleteDialog.message?.subject || 'Message'}
          onClose={() => setDeleteDialog({ open: false, message: null })}
          onConfirm={confirmDeletion}
        />
      </div>
    </div>
  );
}
