import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { cultureItemsService } from '../services/culture-items.service';
import { CultureItem } from '../types/culture-items.type';

export function useCultureItems(cultureId: string) {
  const [cultureItems, setCultureItems] = useState<CultureItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCultureItems = async () => {
    setIsLoading(true);
    try {
      const res = await cultureItemsService.getAll(cultureId);
      if (res.success) {
        setCultureItems(res.data);
      } else {
        toast.error(
          'Failed to load culture items - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load culture items - ' + (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createCultureItem = async (formData: FormData): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await cultureItemsService.create(cultureId, formData);
      if (res.success) {
        toast.success('Culture item created successfully');
        fetchCultureItems();
        success = true;
      } else {
        toast.error(
          'Failed to create culture item - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create culture item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateCultureItem = async (
    id: string,
    formData: FormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await cultureItemsService.update(id, formData);
      if (res.success) {
        toast.success('Culture item updated successfully');
        fetchCultureItems();
        success = true;
      } else {
        toast.error(
          'Failed to update culture item - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update culture item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteCultureItem = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await cultureItemsService.delete(id);
      if (res.success) {
        toast.success('Culture item deleted successfully');
        fetchCultureItems();
        success = true;
      } else {
        toast.error(
          'Failed to delete culture item - ' + (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete culture item - ' + (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  useEffect(() => {
    fetchCultureItems();
  }, [cultureId]);

  return {
    cultureItems,

    createCultureItem,
    updateCultureItem,
    deleteCultureItem,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
