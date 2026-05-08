'use client';

import { useState } from 'react';
import { MapPin, Plus, Sparkles } from 'lucide-react';
import { useAttractions } from '@/features/admin/content-manager/attractions/hooks/useAttractions';
import AttractionList from '@/features/admin/content-manager/attractions/components/List';
import AttractionModal from '@/features/admin/content-manager/attractions/components/Modal';
import Pagination from '@/components/common/Pagination';
import { Attraction } from '@/features/admin/content-manager/attractions/types/attractions.type';
import { AttractionFormData } from '@/features/admin/content-manager/attractions/schemas/attractions.schema';
import { ActionButton } from '@/components/common/ActionButton';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import AttractionHeader from '@/features/admin/content-manager/attractions/components/Header';

export default function ManageAttractions() {
  const {
    attractions,
    meta,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    filters,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    setFilter,
  } = useAttractions();

  const [modal, setModal] = useState<{
    open: boolean;
    attraction: Attraction | null;
  }>({ open: false, attraction: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    attraction: Attraction | null;
  }>({ open: false, attraction: null });

  const handleSave = async (data: AttractionFormData): Promise<boolean> => {
    if (modal.attraction) {
      return await updateAttraction(modal.attraction.id, data);
    }
    return await createAttraction(data);
  };

  const handleDelete = async (): Promise<boolean> => {
    let success = false;
    if (deleteDialog.attraction) {
      success = await deleteAttraction(deleteDialog.attraction.id);
    }

    if (success) {
      setDeleteDialog({ open: false, attraction: null });
    }
    return success;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <AttractionHeader
          stats={meta}
          isLoading={isLoading}
          onClick={() => setModal({ open: true, attraction: null })}
        />

        {/* LIST */}
        <AttractionList
          data={attractions}
          isLoading={isLoading}
          searchValue={filters.search || ''}
          onSearchChange={(val) => setFilter('search', val)}
          onEdit={(item) => setModal({ open: true, attraction: item })}
          onDelete={(item) => setDeleteDialog({ open: true, attraction: item })}
        />

        {/* PAGINATION */}
        {!isLoading && attractions.length > 0 && (
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
        <AttractionModal
          isOpen={modal.open}
          onClose={() => setModal({ open: false, attraction: null })}
          attraction={modal.attraction}
          onSave={handleSave}
          loading={isCreating || isUpdating}
        />

        {/* DELETE CONFIRM */}
        <DeleteConfirmDialog
          isOpen={deleteDialog.open}
          isLoading={isDeleting}
          title={deleteDialog.attraction?.title}
          onClose={() => setDeleteDialog({ open: false, attraction: null })}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
