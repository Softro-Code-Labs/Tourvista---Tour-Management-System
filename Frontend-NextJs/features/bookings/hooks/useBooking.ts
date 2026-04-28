import { useState } from 'react';
import { bookingService } from '../services/booking.service';
import { BookingFormData } from '../schemas/booking.schema';
import toast from 'react-hot-toast';

export function useBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processBooking = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await bookingService.create(data);
      if (res.success) {
        toast.success('Reservation created successfully!');
        return res.data;
      } else {
        toast.error(
          res?.message || 'Failed to create Reservation. Please try again.',
        );
        return null;
      }
    } catch (error: any) {
      toast.error(error.message || 'Server error occurred. Please try again.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const initiatePayment = async (
    bookingId: number,
    amount: number,
    type: string,
  ) => {
    try {
      const res = await bookingService.makePayment(bookingId, amount, type);
      if (res.success) {
        toast.success('Payment made successfully!');
        return res.data;
      } else {
        toast.error(
          res?.message || 'Failed to make payment. Please try again.',
        );
        return null;
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to make payment. Please try again.');
      return null;
    }
  };

  return { isSubmitting, processBooking, initiatePayment };
}
