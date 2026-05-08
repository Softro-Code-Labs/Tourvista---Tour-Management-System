import { CultureFormData } from '../schemas/culture.schema';
import { CultureResponse } from '../types/culture.type';

export const cultureService = {
  async getAll(params: Record<string, any> = {}): Promise<CultureResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/culture?${query}`);
    return res.json();
  },

  async create(formData: CultureFormData) {
    const res = await fetch('/api/v1/culture', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async update(id: string, formData: CultureFormData) {
    const res = await fetch(`/api/v1/culture/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`/api/v1/culture/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
