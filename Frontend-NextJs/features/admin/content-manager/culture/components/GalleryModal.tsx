'use client';

import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCultureItemGallery } from '../hooks/useCultureItemGallery';
import { UploadCloud, X, ImageIcon, GripVertical, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { ActionButton } from '@/components/common/ActionButton';

interface Props {
  itemId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

interface PreviewFile {
  id: string;
  file: File;
  preview: string;
}

export default function CultureItemGalleryModal({
  itemId,
  title,
  isOpen,
  onClose,
}: Props) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { createCultureItemGallery, isCreating } =
    useCultureItemGallery(itemId);

  // Validation Constants
  const MAX_FILES = 10;
  const MAX_SIZE_MB = 2;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  const validateAndAddFiles = useCallback(
    (incomingFiles: File[]) => {
      if (files.length + incomingFiles.length > MAX_FILES) {
        toast.error(`You can only upload a maximum of ${MAX_FILES} images.`);
        return;
      }

      const validNewFiles: PreviewFile[] = [];

      incomingFiles.forEach((file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
          toast.error(`${file.name} is not a supported format.`);
          return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          toast.error(`${file.name} exceeds the 2MB limit.`);
          return;
        }

        validNewFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview: URL.createObjectURL(file),
        });
      });

      setFiles((prev) => [...prev, ...validNewFiles]);
    },
    [files],
  );

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      // Clean up memory
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((f) => formData.append('images', f.file));

    const success = await createCultureItemGallery(formData);
    if (success) {
      setFiles([]);
      onClose();
    }
  };

  // Simple Drag and Drop Reordering Logic
  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const updatedFiles = [...files];
    const dragItem = updatedFiles[dragIndex];
    updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, dragItem);
    setFiles(updatedFiles);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] w-[95vw] max-h-[80vh] flex flex-col rounded-[2rem] p-0 bg-white dark:bg-slate-900 overflow-hidden [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:transition-all [&>button]:hover:bg-slate-100 dark:[&>button]:hover:bg-slate-800">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ImageIcon className="text-blue-500" />
            Upload Gallery
          </DialogTitle>
          <DialogDescription>
            {title} <br />
            Max 10 images, 2MB each. Drag to reorder.
          </DialogDescription>
        </DialogHeader>

        <section className="flex-1 overflow-y-auto px-6 pb-2 space-y-6">
          {/* DROPZONE */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
              validateAndAddFiles(Array.from(e.dataTransfer.files));
            }}
            className={`relative border-2 border-dashed rounded-[1.5rem] p-8 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
              ${isDraggingOver ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10' : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files &&
                validateAndAddFiles(Array.from(e.target.files))
              }
            />
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
              <UploadCloud
                className="text-blue-600 dark:text-blue-400"
                size={32}
              />
            </div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Click or drag images here
            </p>
            <p className="text-xs text-slate-400 mt-1">
              PNG, JPG, WEBP up to 2MB
            </p>
          </div>

          {/* PREVIEW GRID */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto p-2">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData('index', index.toString())
                  }
                  onDrop={(e) => {
                    const dragIndex = parseInt(e.dataTransfer.getData('index'));
                    moveImage(dragIndex, index);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 cursor-move"
                >
                  <img
                    src={file.preview}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />

                  {/* OVERLAY ACTIONS */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="cursor-pointer p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <X size={14} />
                    </button>
                    <GripVertical
                      className="cursor-pointer text-white/70"
                      size={18}
                    />
                  </div>

                  {/* INDEX BADGE */}
                  <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {index + 1}
                  </div>
                </div>
              ))}

              {files.length < MAX_FILES && (
                <button
                  onClick={() => document.getElementById('file-input')?.click()}
                  className="cursor-pointer aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all"
                >
                  <Plus size={24} />
                  <span className="text-[10px] font-bold uppercase mt-1">
                    Add More
                  </span>
                </button>
              )}
            </div>
          )}
        </section>

        {/* FOOTER ACTIONS */}
        <DialogFooter className="px-12 pb-8 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <ActionButton
            text="Cancel"
            icon={<X size={16} />}
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          />

          <ActionButton
            text={isCreating ? 'Uploading...' : `Upload ${files.length} Images`}
            icon={<UploadCloud size={16} />}
            variant="default"
            onClick={handleUpload}
            className="flex-[2]"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
