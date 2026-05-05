import { z } from 'zod';

export const bookingSchema = z.object({
  tourId: z.coerce.number('Tour ID is required'),
  arrivalDate: z.string('Arrival date is required'),

  numberOfTravellers: z.coerce
    .number('Number of guests is required')
    .min(1, { message: 'There must be at least 1 guest' }),

  totalAmount: z.coerce
    .number('Total amount is required')
    .min(1, { message: 'Total amount cannot be negative' }),

  notes: z
    .string()
    .max(200, { message: 'Notes must be at most 200 characters' })
    .optional(),
});

export const updateBookingSchema = bookingSchema.omit({
  tourId: true,
  totalAmount: true,
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type UpdateBookingFormData = z.infer<typeof updateBookingSchema>;
