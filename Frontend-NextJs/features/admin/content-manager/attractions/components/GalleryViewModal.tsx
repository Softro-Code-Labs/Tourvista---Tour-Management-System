'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAttractionItemGallery } from '../hooks/useAttractionItemGallery';
import { Images, Trash2, X, Loader2, CheckCircle2 } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';
import { Button } from '@/components/ui/button';

interface Props {
  itemId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AttractionItemGalleryViewModal({
  itemId,
  title,
  isOpen,
  onClose,
}: Props) {
  const {
    gallery,
    fetchAttractionItemGallery,
    isLoading,
    deleteAttractionItemGallery,
    isDeleting,
  } = useAttractionItemGallery(itemId);

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchAttractionItemGallery();
      setIsSelectionMode(false);
      setSelectedIds([]);
    }
  }, [isOpen]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return;

    // Remove images one by one for a clean UX animation
    for (const id of selectedIds) {
      const success = await deleteAttractionItemGallery(id);
      if (success) {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
      } else {
        // If one fails, we stop to let the user know, but keep remaining selected
        break;
      }
    }

    if (selectedIds.length === 0) {
      setIsSelectionMode(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] flex flex-col rounded-[2.5rem] p-0 bg-white dark:bg-slate-900 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Images className="text-blue-500" size={24} />
                </div>
                Gallery View
              </DialogTitle>
              <DialogDescription className="text-slate-500 mt-2">
                {title} — {gallery.length} images total
              </DialogDescription>
            </div>

            {gallery.length > 0 && (
              <Button
                variant={isSelectionMode ? 'destructive' : 'outline'}
                size="sm"
                className="cursor-pointer rounded-xl h-10 px-4 font-semibold transition-all"
                onClick={() => {
                  setIsSelectionMode(!isSelectionMode);
                  setSelectedIds([]);
                }}
                disabled={isDeleting}
              >
                {isSelectionMode ? 'Cancel Selection' : 'Manage Images'}
              </Button>
            )}
          </div>
        </DialogHeader>

        <section className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
          {isLoading && gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Loading your gallery...</p>
            </div>
          ) : gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Images size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p>No images in this gallery yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {gallery.map((img) => {
                  const isSelected = selectedIds.includes(img.id);
                  return (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, y: 20 }}
                      onClick={() => isSelectionMode && toggleSelection(img.id)}
                      className={`group relative aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all duration-300
                        ${isSelectionMode ? 'cursor-pointer' : 'cursor-default'}
                        ${isSelected ? 'border-blue-500 scale-95 shadow-inner' : 'border-slate-100 dark:border-slate-800'}`}
                    >
                      <img
                        src={img.imageUrl}
                        className="w-full h-full object-cover"
                        alt="Gallery item"
                      />

                      {/* Selection Overlay */}
                      {isSelectionMode && (
                        <div
                          className={`absolute inset-0 transition-colors flex items-center justify-center
                          ${isSelected ? 'bg-blue-500/20' : 'bg-black/10 group-hover:bg-black/30'}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                            ${isSelected ? 'bg-blue-500 border-blue-500 text-white scale-110' : 'border-white text-transparent'}`}
                          >
                            <CheckCircle2 size={20} />
                          </div>
                        </div>
                      )}

                      {/* Individual Delete Shortcut (Optional, only in non-selection mode) */}
                      {!isSelectionMode && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded-md uppercase tracking-wider">
                            Preview Only
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        <DialogFooter className="px-12 pb-8 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <div className="flex w-full gap-4">
            <ActionButton
              text="Close"
              variant="secondary"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 rounded-2xl h-12"
            />
            {isSelectionMode && (
              <ActionButton
                text={
                  isDeleting
                    ? 'Deleting...'
                    : `Delete ${selectedIds.length} Selected`
                }
                icon={
                  isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />
                }
                variant="danger"
                onClick={handleBatchDelete}
                disabled={selectedIds.length === 0 || isDeleting}
                className="flex-[2] rounded-2xl h-12 shadow-xl shadow-red-500/20"
              />
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
