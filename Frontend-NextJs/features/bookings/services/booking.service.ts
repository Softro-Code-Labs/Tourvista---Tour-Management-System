import { BookingFormData } from '../schemas/booking.schema';

export const bookingService = {
  async create(formData: BookingFormData) {
    const res = await fetch('/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async makePayment(bookingId: number, amount: number, type: string) {
    const res = await fetch(`/api/v1/payments/`, {
      method: 'POST',
      body: JSON.stringify({ bookingId, amount, type }),
    });
    return res.json();
  },
};
