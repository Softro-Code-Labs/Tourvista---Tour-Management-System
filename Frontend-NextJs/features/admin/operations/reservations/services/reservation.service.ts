import { BookingStatus } from '@/common/enums/booking-status.enum';
import { ReservationResponse } from '../types/reservation.types';

const BASE_URL = '/api/v1/bookings';

async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Unauthorized Action');
    (error as any).response = { data };
    throw error;
  }

  return data;
}

export const reservationService = {
  getStats: () => apiRequest(`${BASE_URL}/stats`),

  getAll: (params: Record<string, any> = {}): Promise<ReservationResponse> =>
    apiRequest(`${BASE_URL}/admin?${new URLSearchParams(params)}`),

  update: (id: number, status: BookingStatus) =>
    apiRequest(`${BASE_URL}/${id}/admin`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  delete: (id: number) =>
    apiRequest(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }),
};
