import { AttractionItemGalleryResponse } from '../types/attraction-item-gallery.type';

export const attractionItemGalleryService = {
  async getAll(itemId: string): Promise<AttractionItemGalleryResponse> {
    const res = await fetch(`/api/v1/attractions/items/${itemId}/gallery`);
    return res.json();
  },

  async create(itemId: string, formData: FormData) {
    const res = await fetch(`/api/v1/attractions/items/${itemId}/gallery`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async delete(imageId: string) {
    const res = await fetch(`/api/v1/attractions/gallery/${imageId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
