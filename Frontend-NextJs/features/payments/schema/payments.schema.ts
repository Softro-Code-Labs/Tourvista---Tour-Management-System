import { PaymentType } from '@/common/enums/payment-type.enum';
import { z } from 'zod';

export const paymentSchema = z.object({
  bookingId: z.coerce.number('Booking ID is required'),

  amount: z.coerce
    .number('Please enter an amount to pay.')
    .min(5, { message: 'At least $5 is required' }),

  type: z.enum(
    [PaymentType.ADVANCE, PaymentType.FULL],
    'Payment Type is required',
  ),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
