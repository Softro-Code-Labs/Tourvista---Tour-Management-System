import {
  BookingFormData,
  UpdateBookingFormData,
} from '../schemas/bookings.schema';

export const bookingService = {
  async create(formData: BookingFormData) {
    const res = await fetch('/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async update(id: number, formData: UpdateBookingFormData) {
    const res = await fetch(`/api/v1/bookings/${id}/user`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async delete(id: number) {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
