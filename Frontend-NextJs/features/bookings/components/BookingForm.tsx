'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import {
  Users,
  Calendar as CalendarIcon,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

import {
  bookingSchema,
  type BookingFormData,
} from '../schemas/bookings.schema';
import { useBooking } from '../hooks/useBookings';
import { PaymentModal } from '@/features/payments/components/PaymentModal';

import { ActionButton } from '@/components/common/ActionButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { formatReservationId } from '@/lib/format/ids';
import { PaymentType } from '@/common/enums/payment-type.enum';

interface Props {
  tourId: number;
  pricePerGuest: number;
  minGuests: number;
  maxGuests: number;
  onTotalChange?: (total: number) => void;
}

export function BookingForm({
  tourId,
  pricePerGuest,
  minGuests,
  maxGuests,
  onTotalChange,
}: Props) {
  const [createdBookingId, setCreatedBookingId] = useState<number | null>(null);
  const { isSubmitting, processBooking } = useBooking();

  const { register, handleSubmit, reset, watch, setValue, control } =
    useForm<BookingFormData>({
      resolver: zodResolver(bookingSchema) as any,
      defaultValues: {
        tourId: tourId,
        numberOfTravellers: minGuests,
        totalAmount: pricePerGuest * minGuests,
      },
    });

  const watchedGuestCount = watch('numberOfTravellers');
  const watchedTotal = watch('totalAmount');

  useEffect(() => {
    const total = Number(watchedGuestCount) * pricePerGuest;
    setValue('totalAmount', total);
    onTotalChange?.(total);
  }, [watchedGuestCount, pricePerGuest, setValue, onTotalChange]);

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    const bookingResult = await processBooking(data);

    if (bookingResult?.bookingId) {
      setCreatedBookingId(bookingResult.bookingId);
      toast.loading('Booking Created! Now choose a payment plan.', {
        duration: 10000,
      });
    }
  };

  const onInvalid = (formErrors: any) => {
    const firstError = Object.values(formErrors)[0] as any;
    if (firstError) toast.error(firstError.message);
  };

  const baseInput =
    'w-full bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white pl-12';

  if (createdBookingId) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-black tracking-tight dark:text-white">
            Almost There!
          </h3>
          <p className="text-slate-500 text-sm max-w-[280px] mx-auto">
            Your itinerary{' '}
            <span className="font-mono font-bold text-blue-500">
              {formatReservationId(createdBookingId)}
            </span>{' '}
            is ready. Select your payment to secure the spot.
          </p>
        </div>

        {/* PAYMENT MODAL */}
        <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800">
          <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-6 shadow-xl">
            <PaymentModal
              bookingId={createdBookingId}
              totalAmount={watchedTotal}
              initialAmount={watchedTotal}
              type={PaymentType.FULL}
              isExistingPayment={false}
              onCancel={() => setCreatedBookingId(null)}
              onSuccess={() => {
                window.location.href = '/reservations';
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setCreatedBookingId(null)}
          className="w-full text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors py-4"
        >
          ← Go back and edit details
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="space-y-6 animate-in fade-in duration-500"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* ARRIVAL DATE */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Check-In Date
          </Label>
          <Controller
            control={control}
            name="arrivalDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      baseInput,
                      'h-14 cursor-pointer justify-start text-left relative border-2',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10"
                      size={18}
                    />
                    <span className="uppercase text-md ml-2">
                      {field.value ? (
                        format(new Date(field.value), 'PPP')
                      ) : (
                        <span>Select a date</span>
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-[2rem] overflow-hidden border-slate-200 dark:border-slate-800 shadow-2xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date?.toISOString() || '')
                    }
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* TRAVELERS */}
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Travellers Count ({minGuests} - {maxGuests})
          </Label>
          <div className="relative">
            <Users
              className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 z-10"
              size={18}
            />
            <Controller
              name="numberOfTravellers"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={String(field.value)}
                >
                  <SelectTrigger
                    className={cn(
                      baseInput,
                      '!h-14 cursor-pointer border-2 font-medium',
                    )}
                  >
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800">
                    {Array.from(
                      { length: maxGuests - minGuests + 1 },
                      (_, i) => i + minGuests,
                    ).map((n) => (
                      <SelectItem
                        key={n}
                        value={String(n)}
                        className="h-12 pl-4 cursor-pointer font-medium"
                      >
                        {n} {n === 1 ? 'Traveller' : 'Travellers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* SPECIAL NOTES */}
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
          Preferences & Notes
        </Label>
        <div className="relative group">
          <MessageSquare
            className="absolute left-5 top-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <Textarea
            {...register('notes')}
            rows={4}
            placeholder="Dietary requirements, accessibility, or flight info..."
            className={cn(baseInput, 'resize-none pt-4 border-2')}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton
            text="Confirm Booking"
            variant="default"
            type="submit"
            disabled={isSubmitting}
            className="flex-[2] h-14"
          />
          <ActionButton
            text="Reset"
            variant="outline"
            type="button"
            onClick={() => reset()}
            className="flex-1 h-14"
          />
        </div>
      </div>
    </form>
  );
}
