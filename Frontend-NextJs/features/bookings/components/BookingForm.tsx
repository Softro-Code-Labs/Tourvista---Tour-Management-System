'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, min } from 'date-fns';
import { NumericFormat } from 'react-number-format';
import toast from 'react-hot-toast';
import {
  Users,
  Calendar as CalendarIcon,
  MessageSquare,
  CreditCard,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { bookingSchema, type BookingFormData } from '../schemas/booking.schema';
import { useBooking } from '../hooks/useBooking';
import { PaymentType } from '@/common/enums/payment-type.enum';

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

type ButtonView = 'initial' | 'payment-options' | 'advance-input';

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
  const [view, setView] = useState<ButtonView>('initial');
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const { isSubmitting, processBooking, initiatePayment } = useBooking();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    defaultValues: {
      tourId,
      numberOfTravellers: minGuests,
      totalAmount: pricePerGuest * minGuests,
    },
  });

  const watchedGuestCount = watch('numberOfTravellers');

  useEffect(() => {
    const total = Number(watchedGuestCount) * pricePerGuest;
    setValue('totalAmount', total);
    onTotalChange?.(total);
  }, [watchedGuestCount, pricePerGuest, setValue, onTotalChange]);

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    const isAdvance = view === 'advance-input';
    const amountToPay = isAdvance ? advanceAmount : data.totalAmount;

    if (isAdvance && (!amountToPay || amountToPay <= 0)) {
      toast.error('Please enter an amount to pay.');
      return;
    }

    const bookingResult = await processBooking(data);

    if (bookingResult?.bookingId) {
      if (view === 'initial') {
        reset();
      } else {
        initiatePayment(
          bookingResult.bookingId,
          amountToPay,
          isAdvance ? PaymentType.ADVANCE : PaymentType.FULL,
        );
      }
    }
  };

  const onInvalid = (formErrors: any) => {
    const firstError = Object.values(formErrors)[0] as any;
    if (firstError) toast.error(firstError.message);
  };

  const baseInput =
    'w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white pl-12';
  const getBorderClass = (err?: any) =>
    err
      ? 'border-red-500 focus:border-red-500'
      : 'border-slate-200 dark:border-slate-700 focus:border-blue-500';

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* ARRIVAL DATE */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
            Arrival Date
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
                      'h-14 cursor-pointer justify-start text-left font-normal relative',
                      getBorderClass(errors.arrivalDate),
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10"
                      size={18}
                    />
                    {field.value ? (
                      format(new Date(field.value), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl" align="start">
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
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
            Travelers (Min: {minGuests}, Max: {maxGuests})
          </Label>
          <div className="relative">
            <Users
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10"
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
                      '!h-14 cursor-pointer',
                      getBorderClass(errors.numberOfTravellers),
                    )}
                  >
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Array.from(
                      { length: maxGuests - minGuests + 1 },
                      (_, i) => i + minGuests,
                    ).map((n) => (
                      <SelectItem
                        key={n}
                        value={String(n)}
                        className="h-12 pl-4 cursor-pointer"
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
      <div className="space-y-2">
        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
          Special Notes
        </Label>
        <div className="relative">
          <MessageSquare
            className="absolute left-5 top-5 text-slate-400"
            size={18}
          />
          <Textarea
            {...register('notes')}
            rows={3}
            placeholder="Any special requests or information for your tour?"
            className={cn(
              baseInput,
              'resize-none pt-4',
              getBorderClass(errors.notes),
            )}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* PHASE 1: INITIAL BUTTONS */}
        {view === 'initial' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ActionButton
              text="Payment"
              onClick={() => setView('payment-options')}
            />
            <ActionButton
              text="Make Reservation"
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            />
            <ActionButton
              text="Reset Form"
              variant="outline"
              onClick={() => reset()}
            />
          </div>
        )}

        {/* PHASE 2: PAYMENT CHOICES */}
        {view === 'payment-options' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-2">
            <ActionButton
              text="Advance Payment"
              onClick={() => setView('advance-input')}
            />
            <ActionButton
              text="Full Payment"
              variant="secondary"
              type="submit"
            />
            <ActionButton
              text="Back"
              variant="outline"
              onClick={() => setView('initial')}
            />
          </div>
        )}

        {/* PHASE 3: ADVANCE AMOUNT INPUT */}
        {view === 'advance-input' && (
          <div className="space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative">
              <CreditCard
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <NumericFormat
                value={advanceAmount}
                thousandSeparator
                prefix="$ "
                allowNegative={false}
                onValueChange={(values) => {
                  setAdvanceAmount(values.floatValue ?? 0);
                }}
                className="w-full pl-12 h-14 px-4 text-sm rounded-xl bg-gray-200/10 dark:bg-slate-800/40 border-1 border-slate-200 dark:border-slate-700 focus:outline-none focus:border-gray-400 focus:ring-3 focus:ring-gray-300 dark:focus:ring-gray-100/20 transition-all"
                placeholder="$ "
              />
            </div>
            <div className="flex gap-3">
              <ActionButton
                text="Pay & Confirm"
                className="flex-1"
                type="submit"
                disabled={isSubmitting}
              />
              <ActionButton
                text="Cancel"
                className="flex-1"
                variant="outline"
                onClick={() => setView('payment-options')}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
