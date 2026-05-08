import { AttractionItemResponse } from '../types/attraction-items.type';

export const attractionItemsService = {
  async getAll(id: string): Promise<AttractionItemResponse> {
    const res = await fetch(`/api/v1/attractions/${id}/items`);
    return res.json();
  },

  async create(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/attractions/${id}/items`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async update(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/attractions/items/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    return res.json();
  },

  async delete(itemId: string) {
    const res = await fetch(`/api/v1/attractions/items/${itemId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
