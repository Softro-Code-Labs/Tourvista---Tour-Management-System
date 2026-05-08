import { ShowcaseItemGalleryResponse } from '../types/showcase-item-gallery.type';

export const showcaseItemGalleryService = {
  async getAll(itemId: string): Promise<ShowcaseItemGalleryResponse> {
    const res = await fetch(`/api/v1/showcases/items/${itemId}/gallery`);
    return res.json();
  },

  async create(itemId: string, formData: FormData) {
    const res = await fetch(`/api/v1/showcases/items/${itemId}/gallery`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async delete(imageId: string) {
    const res = await fetch(`/api/v1/showcases/gallery/${imageId}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
