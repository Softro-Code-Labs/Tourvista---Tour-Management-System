import { CultureItemGalleryResponse } from '../types/culture-item-gallery.type';

export const cultureItemGalleryService = {
  async getAll(itemId: string): Promise<CultureItemGalleryResponse> {
    const res = await fetch(`/api/v1/culture/items/${itemId}/gallery`);
    return res.json();
  },

  async create(itemId: string, formData: FormData) {
    const res = await fetch(`/api/v1/culture/items/${itemId}/gallery`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async delete(imageId: string) {
    const res = await fetch(`/api/v1/culture/gallery/${imageId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
