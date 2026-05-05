import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { showcaseItemGalleryService } from '../services/showcase-item-gallery.service';
import { ShowcaseItemGallery } from '../types/showcase-item-gallery.type';

export function useShowcaseItemGallery(itemId: string) {
  const [gallery, setGallery] = useState<ShowcaseItemGallery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchShowcaseItemGallery = async () => {
    setIsLoading(true);
    try {
      const res = await showcaseItemGalleryService.getAll(itemId);
      if (res.success) {
        setGallery(res.data);
      } else {
        toast.error(
          'Failed to load Showcases gallery - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load Showcases gallery - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createShowcaseItemGallery = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const res = await showcaseItemGalleryService.create(itemId, formData);
      if (res.success) {
        toast.success('Gallery item created successfully');
        fetchShowcaseItemGallery();
        return true;
      } else {
        toast.error(
          'Failed to create gallery items - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create gallery items - ' + (err.message || 'Unknown error'),
      );
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteShowcaseItemGallery = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await showcaseItemGalleryService.delete(id);
      if (res.success) {
        toast.success('Gallery item deleted successfully');
        fetchShowcaseItemGallery();
        return true;
      } else {
        toast.error(
          'Failed to delete gallery item - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete gallery item - ' + (err.message || 'Unknown error'),
      );
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    gallery,

    fetchShowcaseItemGallery,
    createShowcaseItemGallery,
    deleteShowcaseItemGallery,

    isLoading,
    isCreating,
    isDeleting,
  };
}
