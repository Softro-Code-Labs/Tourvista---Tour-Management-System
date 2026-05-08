'use client';

import { useCultureItems } from '@/features/admin/content-manager/culture/hooks/useCultureItems';
import { Plus, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ActionButton } from '@/components/common/ActionButton';
import { CultureItem } from '../types/culture-items.type';
import { useState } from 'react';
import CultureItemModal from './ItemModal';
import { CultureItemCard } from './ItemCard';
import { DeleteConfirmDialog } from '@/components/dialogs/DeleteConfirmDialog';
import { boolean } from 'zod';

export function CultureItemsList({ cultureId }: { cultureId: string }) {
  const {
    cultureItems,
    createCultureItem,
    updateCultureItem,
    deleteCultureItem,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCultureItems(cultureId);

  const [modal, setModal] = useState<{
    open: boolean;
    item: CultureItem | null;
  }>({ open: false, item: null });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    item: CultureItem | null;
  }>({ open: false, item: null });

  const handleOpenCreate = () => {
    setModal({ open: true, item: null });
  };

  const handleOpenEdit = (item: CultureItem) => {
    setModal({ open: true, item });
  };

  const handleOpenDelete = (item: CultureItem) => {
    setDeleteModal({ open: true, item });
  };

  const handleDelete = async (): Promise<boolean> => {
    let success = false;
    if (deleteModal.item) {
      success = await deleteCultureItem(deleteModal.item.id);
    }

    if (success) {
      setDeleteModal({ open: false, item: null });
    }

    return success;
  };

  const handleFinalSubmit = async (formData: FormData): Promise<boolean> => {
    let success = false;
    if (modal.item) {
      success = await updateCultureItem(modal.item.id, formData);
    } else {
      success = await createCultureItem(formData);
    }

    if (success) {
      setModal({ open: false, item: null });
    }

    return success;
  };

  return (
    <>
      {isLoading ? (
        <div className="bg-slate-50 dark:bg-slate-800 space-y-4 px-6 pt-2">
          {/* HEADER SKELETON */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>

          {/* LIST SKELETONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 shadow-sm animate-pulse overflow-hidden"
              >
                <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-7">
                  <div className="space-y-3 mb-6">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800 space-y-4 pb-6 pt-2">
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Culture Items
              </h4>
              <Badge variant="secondary">{cultureItems.length}</Badge>
            </div>
            <ActionButton
              text="New Item"
              icon={<Plus size={14} strokeWidth={3} />}
              onClick={handleOpenCreate}
              variant="default"
              className="h-10 w-auto"
            />
          </div>

          {/* CONTENT AREA */}
          {cultureItems.length === 0 ? (
            <div className="py-16 px-4 flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="relative p-6 bg-white dark:bg-[#1e293b] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
                    <PackageOpen size={32} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-900/50 animate-bounce" />
              </div>

              {/* TEXT CONTENT */}
              <div className="mt-6 text-center max-w-[240px]">
                <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500 font-medium italic">
                  No sub-items found. Start building your culture category by
                  adding new records.
                </p>
              </div>

              {/* QUICK ACTION */}
              <Button
                variant="ghost"
                onClick={handleOpenCreate}
                className="cursor-pointer mt-8 h-10 px-6 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-xs gap-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
              >
                <Plus size={16} strokeWidth={3} />
                Add your first item
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-8">
              {cultureItems.map((subItem) => (
                <CultureItemCard
                  key={subItem.id}
                  item={subItem}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <CultureItemModal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, item: null })}
        item={modal.item}
        onSubmitAction={handleFinalSubmit}
        isLoading={isCreating || isUpdating}
      />

      {/* DELETE CONFIRM */}
      <DeleteConfirmDialog
        isOpen={deleteModal.open}
        isLoading={isDeleting}
        title={deleteModal.item?.title}
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleDelete}
      />
    </>
  );
}
