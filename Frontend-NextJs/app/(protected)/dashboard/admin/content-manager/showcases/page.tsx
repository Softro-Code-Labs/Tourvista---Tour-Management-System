'use client';

import { useState } from 'react';
import { MapPin, Plus, Sparkles } from 'lucide-react';
import { useShowcases } from '@/features/admin/content-manager/showcases/hooks/useShowcases';
import ShowcaseList from '@/features/admin/content-manager/showcases/components/List';
import ShowcaseModal from '@/features/admin/content-manager/showcases/components/Modal';
import Pagination from '@/components/common/Pagination';
import { Showcase } from '@/features/admin/content-manager/showcases/types/showcases.type';
import { ShowcaseFormData } from '@/features/admin/content-manager/showcases/schemas/showcases.schema';
import { ActionButton } from '@/components/common/ActionButton';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import ShowcaseHeader from '@/features/admin/content-manager/showcases/components/Header';

export default function ManageShowcases() {
  const {
    showcases,
    meta,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    filters,
    createShowcase,
    updateShowcase,
    deleteShowcase,
    setFilter,
  } = useShowcases();

  const [modal, setModal] = useState<{
    open: boolean;
    showcase: Showcase | null;
  }>({ open: false, showcase: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    showcase: Showcase | null;
  }>({ open: false, showcase: null });

  const handleSave = async (data: ShowcaseFormData): Promise<boolean> => {
    if (modal.showcase) {
      return await updateShowcase(modal.showcase.id, data);
    }
    return await createShowcase(data);
  };

  const handleDelete = async (): Promise<boolean> => {
    let success = false;
    if (deleteDialog.showcase) {
      success = await deleteShowcase(deleteDialog.showcase.id);
    }

    if (success) {
      setDeleteDialog({ open: false, showcase: null });
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <ShowcaseHeader
          stats={meta}
          isLoading={isLoading}
          onClick={() => setModal({ open: true, showcase: null })}
        />

        {/* LIST */}
        <ShowcaseList
          data={showcases}
          isLoading={isLoading}
          searchValue={filters.search || ''}
          onSearchChange={(val) => setFilter('search', val)}
          onEdit={(item) => setModal({ open: true, showcase: item })}
          onDelete={(item) => setDeleteDialog({ open: true, showcase: item })}
        />

        {/* PAGINATION */}
        {!isLoading && showcases.length > 0 && (
          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => setFilter('page', p)}
            onLimitChange={(l) => setFilter('limit', l)}
          />
        )}

        {/* MODAL */}
        <ShowcaseModal
          isOpen={modal.open}
          onClose={() => setModal({ open: false, showcase: null })}
          showcase={modal.showcase}
          onSave={handleSave}
          loading={isCreating || isUpdating}
        />

        {/* DELETE CONFIRM */}
        <DeleteConfirmDialog
          isOpen={deleteDialog.open}
          isLoading={isDeleting}
          title={deleteDialog.showcase?.title}
          onClose={() => setDeleteDialog({ open: false, showcase: null })}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
