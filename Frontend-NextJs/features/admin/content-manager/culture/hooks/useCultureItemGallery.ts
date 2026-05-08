import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { cultureItemGalleryService } from '../services/culture-item-gallery.service';
import { CultureItemGallery } from '../types/culture-item-gallery.type';

export function useCultureItemGallery(itemId: string) {
  const [gallery, setGallery] = useState<CultureItemGallery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCultureItemGallery = async () => {
    setIsLoading(true);
    try {
      const res = await cultureItemGalleryService.getAll(itemId);
      if (res.success) {
        setGallery(res.data);
      } else {
        toast.error(
          'Failed to load culture gallery - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load culture gallery - ' + (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createCultureItemGallery = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const res = await cultureItemGalleryService.create(itemId, formData);
      if (res.success) {
        toast.success('Gallery item created successfully');
        fetchCultureItemGallery();
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

  const deleteCultureItemGallery = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await cultureItemGalleryService.delete(id);
      if (res.success) {
        toast.success('Gallery item deleted successfully');
        fetchCultureItemGallery();
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

    fetchCultureItemGallery,
    createCultureItemGallery,
    deleteCultureItemGallery,

    isLoading,
    isCreating,
    isDeleting,
  };
}
