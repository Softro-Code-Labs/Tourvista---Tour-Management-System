import { useState } from 'react';
import { bookingService } from '../services/bookings.service';
import {
  BookingFormData,
  UpdateBookingFormData,
} from '../schemas/bookings.schema';
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

  const updateBooking = async (id: number, data: UpdateBookingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await bookingService.update(id, data);
      if (res.success) {
        toast.success('Reservation updated successfully!');
        return res.data;
      } else {
        toast.error(
          res?.message || 'Failed to update Reservation. Please try again.',
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

  const deleteBooking = async (id: number) => {
    setIsSubmitting(true);
    try {
      const res = await bookingService.delete(id);
      if (res.success) {
        toast.success('Reservation deleted successfully!');
        return res.data;
      } else {
        toast.error(
          res?.message || 'Failed to delete Reservation. Please try again.',
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

  return { isSubmitting, processBooking, updateBooking, deleteBooking };
}
