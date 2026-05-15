'use client';

import { AttractionItem } from '../types/attraction-items.type';
import {
  Edit3,
  Eye,
  Image as ImageIcon,
  ImagePlus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/common/ActionButton';
import { useState } from 'react';
import AttractionItemGalleryModal from './GalleryModal';
import AttractionItemGalleryViewModal from './GalleryViewModal';

interface Props {
  item: AttractionItem;
  onEdit: (item: AttractionItem) => void;
  onDelete: (item: AttractionItem) => void;
}

export function AttractionItemCard({ item, onEdit, onDelete }: Props) {
  const [viewModal, setViewModal] = useState<{
    open: boolean;
  }>({ open: false });

  const [modal, setModal] = useState<{
    open: boolean;
  }>({ open: false });

  const handleOpenCreate = () => {
    setModal({ open: true });
  };

  const handleOpenView = () => {
    setViewModal({ open: true });
  };

  return (
    <div className="group  relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
      <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {item.mainImageUrl ? (
          <img
            src={item.mainImageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700h group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-slate-300">
            <ImageIcon size={48} strokeWidth={1} />
          </div>
        )}

        {/* FLOATING ACTION OVERLAY */}
        <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onEdit(item)}
            className="h-10 w-10 rounded-xl cursor-pointer bg-white/90 dark:bg-slate-900 hover:bg-blue-600 hover:text-white backdrop-blur-md shadow-lg transition-colors"
          >
            <Edit3 size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onDelete(item)}
            className="h-10 w-10 rounded-xl cursor-pointer bg-white/90 dark:bg-slate-900 hover:bg-red-600 hover:text-white backdrop-blur-md shadow-lg transition-colors"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col flex-1 p-7">
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {item.description || 'No description provided for this highlight.'}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <ActionButton
            text="Add Gallery Items"
            icon={<ImagePlus size="{16}" />}
            onClick={handleOpenCreate}
            disabled={false}
          />

          <ActionButton
            text="View Gallery Items"
            variant="secondary"
            icon={<Eye size="{16}" />}
            onClick={handleOpenView}
            disabled={false}
          />
        </div>
      </div>

      {/* GALLERY MODAL */}
      {modal.open && (
        <AttractionItemGalleryModal
          itemId={item.id}
          title={item.title}
          isOpen={modal.open}
          onClose={() => setModal({ open: false })}
        />
      )}

      {viewModal.open && (
        <AttractionItemGalleryViewModal
          itemId={item.id}
          title={item.title}
          isOpen={viewModal.open}
          onClose={() => setViewModal({ open: false })}
        />
      )}
    </div>
  );
}
