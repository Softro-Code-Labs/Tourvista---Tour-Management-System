import { CultureItemResponse } from '../types/culture-items.type';

export const cultureItemsService = {
  async getAll(id: string): Promise<CultureItemResponse> {
    const res = await fetch(`/api/v1/culture/${id}/items`);
    return res.json();
  },

  async create(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/culture/${id}/items`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async update(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/culture/items/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    return res.json();
  },

  async delete(itemId: string) {
    const res = await fetch(`/api/v1/culture/items/${itemId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
