'use client';

import { useState } from 'react';
import { MapPin, Plus, Sparkles } from 'lucide-react';
import { useCulture } from '@/features/admin/content-manager/culture/hooks/useCulture';
import CultureList from '@/features/admin/content-manager/culture/components/List';
import CultureModal from '@/features/admin/content-manager/culture/components/Modal';
import Pagination from '@/components/common/Pagination';
import { Culture } from '@/features/admin/content-manager/culture/types/culture.type';
import { CultureFormData } from '@/features/admin/content-manager/culture/schemas/culture.schema';
import { ActionButton } from '@/components/common/ActionButton';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import CultureHeader from '@/features/admin/content-manager/culture/components/Header';

export default function ManageCulture() {
  const {
    culture,
    meta,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    filters,
    createCulture,
    updateCulture,
    deleteCulture,
    setFilter,
  } = useCulture();

  const [modal, setModal] = useState<{
    open: boolean;
    culture: Culture | null;
  }>({ open: false, culture: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    culture: Culture | null;
  }>({ open: false, culture: null });

  const handleSave = async (data: CultureFormData): Promise<boolean> => {
    if (modal.culture) {
      return await updateCulture(modal.culture.id, data);
    }
    return await createCulture(data);
  };

  const handleDelete = async (): Promise<boolean> => {
    let success = false;
    if (deleteDialog.culture) {
      success = await deleteCulture(deleteDialog.culture.id);
    }

    if (success) {
      setDeleteDialog({ open: false, culture: null });
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <CultureHeader
          stats={meta}
          isLoading={isLoading}
          onClick={() => setModal({ open: true, culture: null })}
        />

        {/* LIST */}
        <CultureList
          data={culture}
          isLoading={isLoading}
          searchValue={filters.search || ''}
          onSearchChange={(val) => setFilter('search', val)}
          onEdit={(item) => setModal({ open: true, culture: item })}
          onDelete={(item) => setDeleteDialog({ open: true, culture: item })}
        />

        {/* PAGINATION */}
        {!isLoading && culture.length > 0 && (
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
        <CultureModal
          isOpen={modal.open}
          onClose={() => setModal({ open: false, culture: null })}
          culture={modal.culture}
          onSave={handleSave}
          loading={isCreating || isUpdating}
        />

        {/* DELETE CONFIRM */}
        <DeleteConfirmDialog
          isOpen={deleteDialog.open}
          isLoading={isDeleting}
          title={deleteDialog.culture?.title}
          onClose={() => setDeleteDialog({ open: false, culture: null })}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
