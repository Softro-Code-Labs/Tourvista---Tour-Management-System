import { TourResponse } from '../types/tour.types';

export const tourService = {
  async getAll(params: Record<string, any> = {}): Promise<TourResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/tours?${query}`);
    return res.json();
  },

  async create(formData: FormData) {
    const res = await fetch('/api/v1/tours', {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async update(id: number, formData: FormData) {
    const res = await fetch(`/api/v1/tours/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    return res.json();
  },

  async delete(id: number) {
    const res = await fetch(`/api/v1/tours/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  async getStats() {
    const res = await fetch('/api/v1/tours/stats');
    return res.json();
  },
};
