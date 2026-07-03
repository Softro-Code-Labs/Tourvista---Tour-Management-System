'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/features/admin/community-center/inquiries/hooks/useInquiries';
import InquiryFilters from '@/features/admin/community-center/inquiries/components/FilterBar';
import InquiriesTable from '@/features/admin/community-center/inquiries/components/Table';
import { Message } from '@/features/admin/community-center/inquiries/types/inquiries.type';
import Pagination from '@/components/common/Pagination';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import { InquiriesHeader } from '@/features/admin/community-center/inquiries/components/Header';

export default function ManageMessages() {
  const {
    stats,
    loadingStats,

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
        <InquiriesHeader stats={stats} isLoading={loadingStats} />

        <main className="space-y-8">
          <InquiryFilters filters={filters} setFilter={setFilter} />
          <section
            className={cn(
              'relative transition-all duration-500',
              loading
                ? 'opacity-40 blur-[2px] pointer-events-none'
                : 'opacity-100',
            )}
          >
            <InquiriesTable
              messages={messages}
              loading={loading}
              onToggleReadStatus={toggleReadStatus}
              onDelete={(m) => setDeleteDialog({ open: true, message: m })}
            />
          </section>

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
