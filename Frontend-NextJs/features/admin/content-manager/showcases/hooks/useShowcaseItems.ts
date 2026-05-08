import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { showcaseItemsService } from '../services/showcase-items.service';
import { ShowcaseItem } from '../types/showcase-items.type';

export function useShowcaseItems(showcaseId: string) {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchShowcaseItems = async () => {
    setIsLoading(true);
    try {
      const res = await showcaseItemsService.getAll(showcaseId);
      if (res.success) {
        setShowcaseItems(res.data);
      } else {
        toast.error(
          'Failed to load showcases items - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load showcases items - ' + (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createShowcaseItem = async (formData: FormData): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await showcaseItemsService.create(showcaseId, formData);
      if (res.success) {
        toast.success('Showcase item created successfully');
        fetchShowcaseItems();
        success = true;
      } else {
        toast.error(
          'Failed to create showcase item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create showcase item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateShowcaseItem = async (
    id: string,
    formData: FormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await showcaseItemsService.update(id, formData);
      if (res.success) {
        toast.success('Showcase item updated successfully');
        fetchShowcaseItems();
        success = true;
      } else {
        toast.error(
          'Failed to update showcase item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update showcase item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteShowcaseItem = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await showcaseItemsService.delete(id);
      if (res.success) {
        toast.success('Showcase item deleted successfully');
        fetchShowcaseItems();
        success = true;
      } else {
        toast.error(
          'Failed to delete showcase item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete showcase item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  useEffect(() => {
    fetchShowcaseItems();
  }, [showcaseId]);

  return {
    showcaseItems,

    createShowcaseItem,
    updateShowcaseItem,
    deleteShowcaseItem,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
