'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  updateBookingSchema,
  UpdateBookingFormData,
} from '@/features/bookings/schemas/bookings.schema';
import { useBooking } from '@/features/bookings/hooks/useBookings';
import { Reservation } from '@/features/reservations/types/reservations.type';

import { ActionButton } from '@/components/common/ActionButton';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MessageSquare, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function UpdateBookingForm({
  reservation,
  onSuccess,
  onCancel,
}: {
  reservation: Reservation;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { updateBooking, isSubmitting } = useBooking();
  const { register, handleSubmit, control } = useForm<UpdateBookingFormData>({
    resolver: zodResolver(updateBookingSchema) as any,
    defaultValues: {
      arrivalDate: reservation.arrivalDate,
      numberOfTravellers: reservation.numberOfTravellers,
      notes: reservation.notes,
    },
  });

  const onSubmit = async (data: UpdateBookingFormData) => {
    const res = await updateBooking(reservation.id, data);
    if (res) onSuccess();
  };

  const baseInput =
    'w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 dark:text-white pl-12';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        {/* ARRIVAL DATE INPUT */}
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
                  onSelect={(date) => field.onChange(date?.toISOString() || '')}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      {/* NUMBER OF TRAVELLERS INPUT */}
      <div>
        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
          Travelers (Min: {reservation.tour.minGuests}, Max:{' '}
          {reservation.tour.maxGuests})
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
                  className={cn(baseInput, '!h-14 cursor-pointer')}
                >
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {Array.from(
                    {
                      length:
                        reservation.tour.maxGuests -
                        reservation.tour.minGuests +
                        1,
                    },
                    (_, i) => i + reservation.tour.minGuests,
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

      {/* SPECIAL NOTES INPUT */}
      <div>
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
            rows={4}
            placeholder="Any special requests or information for your tour?"
            className={cn(baseInput, 'resize-none pt-4')}
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 pt-4">
        <ActionButton
          text="Update Reservation"
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        />
        <ActionButton
          text="Cancel"
          variant="outline"
          type="button"
          onClick={onCancel}
          className="flex-1"
        />
      </div>
    </form>
  );
}
