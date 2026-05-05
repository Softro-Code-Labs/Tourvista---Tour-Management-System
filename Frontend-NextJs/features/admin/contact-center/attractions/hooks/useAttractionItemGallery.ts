import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { attractionItemGalleryService } from '../services/attraction-item-gallery.service';
import { AttractionItemGallery } from '../types/attraction-item-gallery.type';

export function useAttractionItemGallery(itemId: string) {
  const [gallery, setGallery] = useState<AttractionItemGallery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAttractionItemGallery = async () => {
    setIsLoading(true);
    try {
      const res = await attractionItemGalleryService.getAll(itemId);
      if (res.success) {
        setGallery(res.data);
      } else {
        toast.error(
          'Failed to load attractions gallery - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load attractions gallery - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createAttractionItemGallery = async (formData: FormData) => {
    setIsCreating(true);
    try {
      const res = await attractionItemGalleryService.create(itemId, formData);
      if (res.success) {
        toast.success('Gallery item created successfully');
        fetchAttractionItemGallery();
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

  const deleteAttractionItemGallery = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await attractionItemGalleryService.delete(id);
      if (res.success) {
        toast.success('Gallery item deleted successfully');
        fetchAttractionItemGallery();
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

    fetchAttractionItemGallery,
    createAttractionItemGallery,
    deleteAttractionItemGallery,

    isLoading,
    isCreating,
    isDeleting,
  };
}
