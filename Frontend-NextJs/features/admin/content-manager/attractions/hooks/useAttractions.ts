import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { attractionsService } from '../services/attractions.service';
import { AttractionFormData } from '../schemas/attractions.schema';
import {
  Attraction,
  AttractionFilters,
  AttractionResponse,
} from '../types/attractions.type';

export function useAttractions() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [meta, setMeta] = useState<AttractionResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<AttractionFilters>({
    page: 1,
    limit: 10,
    search: '',
  });

  const fetchAttractions = useCallback(async () => {
    setIsLoading(true);
    try {
      // CLEAN FILTERS TO AVOID SENDING UNNECESSARY QUERY PARAMS
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await attractionsService.getAll(cleanFilters);
      if (res.success) {
        setAttractions(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          'Failed to load attractions categories - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load attractions categories - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const createAttraction = async (
    formData: AttractionFormData,
  ): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await attractionsService.create(formData);
      if (res.success) {
        toast.success('Attraction category created successfully');
        fetchAttractions();
        success = true;
      } else {
        toast.error(
          'Failed to create attraction category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create attraction category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateAttraction = async (
    id: string,
    formData: AttractionFormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await attractionsService.update(id, formData);
      if (res.success) {
        toast.success('Attraction category updated successfully');
        fetchAttractions();
        success = true;
      } else {
        toast.error(
          'Failed to update attraction category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update attraction category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteAttraction = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await attractionsService.delete(id);
      if (res.success) {
        toast.success('Attraction category deleted successfully');
        fetchAttractions();
        success = true;
      } else {
        toast.error(
          'Failed to delete attraction category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete attraction category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  const setFilter = (
    key: keyof AttractionFilters,
    value: AttractionFilters[keyof AttractionFilters],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? (value as number) : 1,
    }));
  };

  const clearFilters = () =>
    setFilters({
      page: 1,
      limit: 10,
      search: '',
    });

  useEffect(() => {
    fetchAttractions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchAttractions(), 400);
    return () => clearTimeout(timer);
  }, [filters]);

  return {
    attractions,
    meta,

    createAttraction,
    updateAttraction,
    deleteAttraction,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,

    filters,
    setFilter,
    clearFilters,
  };
}
