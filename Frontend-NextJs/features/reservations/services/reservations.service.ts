import { ReservationResponse } from '../types/reservations.type';

export const reservationService = {
  async getAll(params: Record<string, any> = {}): Promise<any> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/bookings/user?${query}`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  },
};
