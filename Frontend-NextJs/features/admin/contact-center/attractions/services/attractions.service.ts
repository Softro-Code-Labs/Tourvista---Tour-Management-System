import { AttractionFormData } from '../schemas/attractions.schema';
import { AttractionResponse } from '../types/attractions.type';

export const attractionsService = {
  async getAll(params: Record<string, any> = {}): Promise<AttractionResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/attractions?${query}`);
    return res.json();
  },

  async create(formData: AttractionFormData) {
    const res = await fetch('/api/v1/attractions', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async update(id: string, formData: AttractionFormData) {
    const res = await fetch(`/api/v1/attractions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`/api/v1/attractions/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
