'use client';

import { useState } from 'react';
import { MapPin, Plus, Sparkles } from 'lucide-react';
import { useAttractions } from '@/features/admin/contact-center/attractions/hooks/useAttractions';
import AttractionList from '@/features/admin/contact-center/attractions/components/List';
import AttractionModal from '@/features/admin/contact-center/attractions/components/Modal';
import Pagination from '@/components/common/Pagination';
import { Attraction } from '@/features/admin/contact-center/attractions/types/attractions.type';
import { AttractionFormData } from '@/features/admin/contact-center/attractions/schemas/attractions.schema';
import { ActionButton } from '@/components/common/ActionButton';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';

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
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* HEADER */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600">
              <Sparkles size={12} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Admin Console
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-xl shadow-blue-500/10 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <MapPin size={32} className="text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Attractions <span className="text-blue-600">View</span>
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  Manage attraction categories and control how they appear to
                  users on the website.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Inventory
                </p>
                <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-1.5">
                  {meta.total} Attractions
                </p>
              </div>
              <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800 mx-1" />
              <ActionButton
                text="Create New"
                icon={<Plus size={16} strokeWidth={3} />}
                onClick={() => setModal({ open: true, attraction: null })}
                className="w-auto"
              />
            </div>
          </div>
        </header>

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
