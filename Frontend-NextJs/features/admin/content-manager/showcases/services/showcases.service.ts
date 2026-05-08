import { ShowcaseFormData } from '../schemas/showcases.schema';
import { ShowcaseResponse } from '../types/showcases.type';

export const showcasesService = {
  async getAll(params: Record<string, any> = {}): Promise<ShowcaseResponse> {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/v1/showcases?${query}`);
    return res.json();
  },

  async create(formData: ShowcaseFormData) {
    const res = await fetch('/api/v1/showcases', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async update(id: string, formData: ShowcaseFormData) {
    const res = await fetch(`/api/v1/showcases/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
    });
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`/api/v1/showcases/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
