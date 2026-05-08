import { ShowcaseItemResponse } from '../types/showcase-items.type';

export const showcaseItemsService = {
  async getAll(id: string): Promise<ShowcaseItemResponse> {
    const res = await fetch(`/api/v1/showcases/${id}/items`);
    return res.json();
  },

  async create(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/showcases/${id}/items`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async update(id: string, formData: FormData) {
    const res = await fetch(`/api/v1/showcases/items/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    return res.json();
  },

  async delete(itemId: string) {
    const res = await fetch(`/api/v1/showcases/items/${itemId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
