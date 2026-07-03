import { ReservationResponse } from '../types/reservations.type';

export const reservationService = {
  async getAll(params: Record<string, any> = {}): Promise<ReservationResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/bookings/user?${query}`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  },

  async updateNotes(
    id: number,
    notes: string,
  ): Promise<{ success: boolean; message?: string }> {
    const res = await fetch(`/api/v1/bookings/${id}/user/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
    return res.json();
  },
};
