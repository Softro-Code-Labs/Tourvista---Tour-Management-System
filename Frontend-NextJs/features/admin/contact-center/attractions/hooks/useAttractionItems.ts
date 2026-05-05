import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { attractionItemsService } from '../services/attraction-items.service';
import { AttractionItem } from '../types/attraction-items.type';

export function useAttractionItems(attractionId: string) {
  const [attractionItems, setAttractionItems] = useState<AttractionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAttractionItems = async () => {
    setIsLoading(true);
    try {
      const res = await attractionItemsService.getAll(attractionId);
      if (res.success) {
        setAttractionItems(res.data);
      } else {
        toast.error(
          'Failed to load attractions items - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load attractions items - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createAttractionItem = async (formData: FormData): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await attractionItemsService.create(attractionId, formData);
      if (res.success) {
        toast.success('Attraction item created successfully');
        fetchAttractionItems();
        success = true;
      } else {
        toast.error(
          'Failed to create attraction item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create attraction item - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateAttractionItem = async (
    id: string,
    formData: FormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await attractionItemsService.update(id, formData);
      if (res.success) {
        toast.success('Attraction item updated successfully');
        fetchAttractionItems();
        success = true;
      } else {
        toast.error(
          'Failed to update attraction item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update attraction item - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteAttractionItem = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await attractionItemsService.delete(id);
      if (res.success) {
        toast.success('Attraction item deleted successfully');
        fetchAttractionItems();
        success = true;
      } else {
        toast.error(
          'Failed to delete attraction item - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete attraction item - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  useEffect(() => {
    fetchAttractionItems();
  }, [attractionId]);

  return {
    attractionItems,

    createAttractionItem,
    updateAttractionItem,
    deleteAttractionItem,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
