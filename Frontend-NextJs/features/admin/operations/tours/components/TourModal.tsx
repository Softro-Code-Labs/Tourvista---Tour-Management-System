'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Clock,
  ImagePlus,
  Info,
  Loader2,
  MapPin,
  RotateCcw,
  Users,
  X,
} from 'lucide-react';

import { tourSchema, TourFormData } from '../schema/tour.schema';
import { Tour } from '../types/tour.types';
import { tourService } from '../services/tour.service';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: {
    fetchTours: () => Promise<void>;
    fetchStats: () => Promise<void>;
  };
  tour?: Tour | null;
}

export default function TourModal({ isOpen, onClose, onSuccess, tour }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setPreview(tour?.image || null);
      setIsImageRemoved(false);
      reset(
        tour
          ? {
              title: tour.title,
              description: tour.description,
              location: tour.location,
              price: tour.price,
              duration: tour.duration,
              minGuests: tour.minGuests,
              maxGuests: tour.maxGuests,
              isActive: tour.isActive,
            }
          : {
              isActive: true,
            },
      );
    } else {
      setPreview(null);
    }
  }, [tour, isOpen, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageRemoved(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setIsImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: TourFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append('image', file);
    } else if (isImageRemoved) {
      formData.append('image', '');
    } else if (tour?.image) {
      formData.append('image', tour.image);
    }

    const res = tour
      ? await tourService.update(tour.id, formData)
      : await tourService.create(formData);

    if (res?.success) {
      toast.success(
        tour
          ? 'Tour plan updated successfully!'
          : 'Tour plan created successfully!',
      );

      setIsImageRemoved(false);
      await onSuccess.fetchTours();
      await onSuccess.fetchStats();
      onClose();
    } else {
      toast.error(
        'Failed to save tour plan - ' + (res?.message || 'Unknown error'),
      );
    }
  };

  const onInvalid = (errors: any) => {
    const errorMessages = Object.values(errors);

    if (errorMessages.length > 0) {
      const firstError = errorMessages[0] as any;
      toast.error(firstError.message);
    }
  };

  const handleReset = () => {
    reset();
    setPreview(tour?.image || null);
    setIsImageRemoved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast.success('Form reset successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px] max-h-[95vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-0 transition-all duration-500">
        {/* HEADER */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {tour ? 'Edit Package' : 'Create New Plan'}
            </DialogTitle>

            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              {tour
                ? 'Update your tour plan details'
                : 'Design your perfect tour plan'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl">
            <Label
              htmlFor="active-mode"
              className="text-xs font-black uppercase tracking-tight text-slate-500 cursor-pointer"
            >
              Live
            </Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  id="active-mode"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-blue-600 cursor-pointer"
                />
              )}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="p-8 space-y-8"
        >
          {/* IMAGE */}
          <div className="space-y-3">
            <Label className="text-sm font-bold flex items-center gap-2">
              <ImagePlus size={16} className="text-blue-500" /> Cover Media
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
                  Click to upload 16:9 photo
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
              <Label htmlFor="title" className="text-sm font-bold">
                Package Title
              </Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="The Grand Ella Expedition"
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg font-medium"
              />
            </div>

            {/* LOCATION AND DURATION */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" /> Location
                </Label>
                <Input
                  {...register('location')}
                  placeholder="Ella, Sri Lanka"
                  className="h-12 rounded-xl border-slate-100 bg-slate-50/50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <Clock size={14} className="text-blue-500" /> Duration
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    {...register('duration', { valueAsNumber: true })}
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">
                    Days
                  </span>
                </div>
              </div>
            </div>

            {/* GUEST LIMITS SECTION */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <Users size={14} className="text-blue-500" /> Min Guests
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    {...register('minGuests', { valueAsNumber: true })}
                    min={1}
                    max={100}
                    placeholder="1"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">
                    Min
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <Users size={14} className="text-blue-500" /> Max Guests
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    {...register('maxGuests', { valueAsNumber: true })}
                    min={1}
                    max={100}
                    placeholder="10"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">
                    Max
                  </span>
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">Pricing</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    value={field.value ?? ''}
                    thousandSeparator
                    prefix="$ "
                    allowNegative={false}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    className="w-full h-14 px-4 rounded-xl bg-gray-200/10 dark:bg-gray-400/10 border-1 border-slate-200 dark:border-slate-200/10 focus:outline-none focus:border-gray-400 focus:ring-3 focus:ring-gray-300 dark:focus:ring-gray-200/10 transition-all"
                    placeholder="$ 0"
                  />
                )}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Label className="text-sm font-bold flex items-center gap-2">
                <Info size={14} className="text-blue-500" /> Detailed
                Description
              </Label>
              <Textarea
                {...register('description')}
                placeholder="What makes this tour special?"
                rows={4}
                className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white resize-none p-4"
              />
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="sticky bottom-0 bg-white dark:bg-slate-900 py-4 px-8 border-t border-slate-100 dark:border-slate-800 flex flex-row items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-12 px-6 rounded-2xl font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
            >
              Discard
            </Button>

            <div className="flex-1" />

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-12 px-5 rounded-2xl font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-2"
            >
              <RotateCcw size={16} className="text-slate-400" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[160px] h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {tour ? 'Update Package' : 'Publish Plan'}

                  <ArrowRight size={18} className="opacity-70" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
