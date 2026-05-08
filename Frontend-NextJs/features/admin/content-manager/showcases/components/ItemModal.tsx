'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ImagePlus,
  Info,
  RefreshCcwDot,
  Save,
  Sparkles,
  Type,
  Undo2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

import {
  showcaseItemSchema,
  ShowcaseItemFormData,
} from '../schemas/showcases.schema';
import { ShowcaseItem } from '../types/showcase-items.type';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ActionButton } from '@/components/common/ActionButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAction: (formData: FormData) => Promise<boolean>;
  item?: ShowcaseItem | null;
  isLoading: boolean;
}

export default function ShowcaseItemModal({
  isOpen,
  onClose,
  onSubmitAction,
  item,
  isLoading,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShowcaseItemFormData>({
    resolver: zodResolver(showcaseItemSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setPreview(item?.mainImageUrl || null);
      reset(
        item
          ? {
              title: item.title,
              description: item.description,
            }
          : {
              title: '',
              description: '',
            },
      );
    }
  }, [item, isOpen, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = async (data: ShowcaseItemFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append('image', file);
    }

    const success = await onSubmitAction(formData);
    if (success) {
      onClose();
    }
  };

  const onInvalid = () => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message as string);
    }
  };

  const handleReset = () => {
    reset();
    setPreview(item?.mainImageUrl || null);
    toast.success('Form reset successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] w-[95vw] max-h-[80vh] flex flex-col rounded-[2rem] p-0 bg-white dark:bg-slate-900 overflow-hidden [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:transition-all [&>button]:hover:bg-slate-100 dark:[&>button]:hover:bg-slate-800">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {item ? 'Update Showcase Item' : 'Add New Item'}
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Sparkles className="text-blue-500" size={14} />
            </div>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm uppercase font-semibold text-slate-400 tracking-[0.15em]">
              {item
                ? 'Modify an existing showcase item'
                : 'Create a new showcase item for this showcase'}
            </p>
          </DialogDescription>
        </DialogHeader>

        <form
          id="attraction-item-form"
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          className="flex-1 overflow-y-auto px-6 pb-2 space-y-6"
        >
          {/* IMAGE UPLOAD */}
          <div className="space-y-3">
            <Label className="text-sm font-bold flex items-center gap-2">
              <ImagePlus size={16} className="text-blue-500" /> Main Image
            </Label>
            {preview ? (
              <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="rounded-full h-10 w-10 p-0 shadow-lg"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[16/9] w-full rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-900 transition-all group"
              >
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <ImagePlus
                    className="text-slate-400 group-hover:text-blue-500"
                    size={32}
                  />
                </div>

                <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">
                  Click to upload 4:3 photo
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* TITLE */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-bold flex items-center gap-2"
              >
                <Type size={14} className="text-blue-500" /> Item Title
              </Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Mirissa Beach"
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label className="text-sm font-bold flex items-center gap-2">
                <Info size={14} className="text-blue-500" /> Description
              </Label>
              <Textarea
                {...register('description')}
                placeholder="A palm-fringed beach famous for whale watching tours, golden sunsets, and a laid-back tropical atmosphere."
                rows={4}
                className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white resize-none p-4"
              />
            </div>
          </div>
        </form>

        {/* FOOTER */}
        <DialogFooter className="px-12 pb-8 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <ActionButton
            text="Discard"
            type="button"
            icon={<Undo2 size={16} />}
            variant="outline"
            onClick={onClose}
            className="flex-1"
          />
          <div className="flex-1" />

          <ActionButton
            text="Reset"
            type="button"
            icon={<RefreshCcwDot size={16} />}
            variant="danger"
            onClick={handleReset}
            className="flex-1"
          />

          <ActionButton
            text={item ? 'Save Changes' : 'Add Item'}
            type="submit"
            icon={<Save size={16} />}
            variant="default"
            form="attraction-item-form"
            disabled={isLoading}
            className="flex-[1.5]"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
