'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Type,
  AlignLeft,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ActionButton } from '@/components/common/ActionButton';
import {
  attractionSchema,
  AttractionFormData,
} from '../schemas/attractions.schema';
import { Attraction } from '../types/attractions.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  attraction: Attraction | null;
  onSave: (data: AttractionFormData) => Promise<boolean>;
  loading: boolean;
}

export default function AttractionModal({
  isOpen,
  onClose,
  attraction,
  onSave,
  loading,
}: Props) {
  const defaultValues = useMemo(
    () => ({
      title: attraction?.title || '',
      description: attraction?.description || '',
    }),
    [attraction],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttractionFormData>({
    resolver: zodResolver(attractionSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset, defaultValues]);

  const onSubmit = async (data: AttractionFormData) => {
    if (await onSave(data)) onClose();
  };

  const onInvalid = () => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] w-[95vw] max-h-[80vh] flex flex-col rounded-[2rem] p-0 bg-white dark:bg-slate-900 overflow-hidden [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:transition-all [&>button]:hover:bg-slate-100 dark:[&>button]:hover:bg-slate-800">
        {/* HEADER */}
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {attraction ? 'Edit Category' : 'New Category'}
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Sparkles className="text-blue-500" size={14} />
            </div>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm uppercase font-semibold text-slate-400 tracking-[0.15em]">
              {attraction
                ? 'Modify existing destination group'
                : 'Define a new attraction type'}
            </p>
          </DialogDescription>
        </DialogHeader>

        <form
          id="attraction-form"
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex-1 overflow-y-auto px-6 pb-2 space-y-6"
        >
          <div className="space-y-2">
            <Label className="text-sm font-bold ml-1 flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Type size={15} className="text-blue-500" /> Category Title
            </Label>
            <Input
              {...register('title')}
              placeholder="Wildlife & Safari Adventures"
              className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 transition-all text-base font-medium"
            />
          </div>

          <div className="group space-y-2">
            <Label className="text-sm font-bold ml-1 flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <AlignLeft size={15} className="text-blue-500" /> Description
            </Label>
            <Textarea
              {...register('description')}
              placeholder="Experience Sri Lanka's untamed wilderness from leopard-rich jungles to elephant herds and highland plateaus filled with rare biodiversity."
              className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 transition-all min-h-[140px] p-4 text-base leading-relaxed"
            />
          </div>
        </form>

        <DialogFooter className="px-12 pb-8 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <ActionButton
            text="Cancel"
            type="button"
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={onClose}
            className="flex-1"
          />
          <div className="flex-1" />

          <ActionButton
            text="Reset"
            type="button"
            variant="danger"
            icon={<RefreshCw size={16} />}
            onClick={() => {
              reset(defaultValues);
              toast.success('Form reset successfully!');
            }}
            className="flex-1"
          />
          <ActionButton
            text={attraction ? 'Save Changes' : 'Create Category'}
            type="submit"
            variant="success"
            icon={<CheckCircle2 size={16} />}
            form="attraction-form"
            disabled={loading}
            className="flex-[1.5] px-12 w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
