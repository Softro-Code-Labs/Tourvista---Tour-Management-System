'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, MessageSquare, Send, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { reviewsSchema, ReviewFormData } from '../schemas/reviews.schema';
import { useCreateReview } from '../hooks/useReviews';
import PrimaryButton from '@/components/common/PrimaryButton';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: number;
  tourTitle: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  tourId,
  tourTitle,
}: ReviewModalProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const { mutateAsync: submitReview, isPending } = useCreateReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewsSchema) as any,
    defaultValues: {
      tourId: tourId,
      rating: 5,
      comment: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        tourId: tourId,
        rating: 5,
        comment: '',
      });
    }
  }, [isOpen, tourId, reset]);

  const selectedRating = watch('rating');

  const handleFormSubmit = async (data: ReviewFormData) => {
    await submitReview(data);
    onClose();
  };

  const onInvalid = () => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-2xl">
        {/* HEADER SECTION */}
        <div className="relative p-8 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
          <DialogHeader>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 w-fit mb-3">
              <Sparkles size={12} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Share Experience
              </span>
            </div>
            <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Review Your Trip
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium pt-1">
              How was your experience with{' '}
              <span className="text-blue-600 font-bold">{tourTitle}</span>?
            </DialogDescription>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          className="p-8 space-y-8"
        >
          {/* STAR RATING PICKER */}
          <div className="space-y-3 text-center">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Your Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue('rating', star, { shouldValidate: true })
                  }
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-125 active:scale-90 outline-none"
                >
                  <Star
                    size={36}
                    className={cn(
                      'transition-colors duration-200',
                      (hoveredRating || selectedRating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200 dark:text-slate-800',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* COMMENT TEXTAREA */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Your Story
            </label>
            <div className="relative">
              <textarea
                {...register('comment')}
                rows={4}
                placeholder="Tell other travelers about the highlights, the guide, and the scenery..."
                className={cn(
                  'w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white outline-none transition-all resize-none font-medium text-sm',
                  errors.comment
                    ? 'border-red-500 focus:ring-red-500/10'
                    : 'border-slate-100 dark:border-white/10 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50',
                )}
              />
              <MessageSquare
                className="absolute right-4 bottom-4 text-slate-300 dark:text-slate-700"
                size={20}
              />
            </div>
          </div>

          {/* HIDDEN INPUT FOR TOUR ID */}
          <input type="hidden" {...register('tourId')} />

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              loading={isPending} // Using state from mutation hook
              fullWidth
              className="h-16 rounded-2xl text-base font-black shadow-xl shadow-blue-500/20 active:scale-[0.98]"
            >
              Post Review <Send size={18} className="ml-2" />
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
