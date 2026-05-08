import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { cultureService } from '../services/culture.service';
import { CultureFormData } from '../schemas/culture.schema';
import {
  Culture,
  CultureFilters,
  CultureResponse,
} from '../types/culture.type';

export function useCulture() {
  const [culture, setCulture] = useState<Culture[]>([]);
  const [meta, setMeta] = useState<CultureResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<CultureFilters>({
    page: 1,
    limit: 10,
    search: '',
  });

  const fetchCulture = useCallback(async () => {
    setIsLoading(true);
    try {
      // CLEAN FILTERS TO AVOID SENDING UNNECESSARY QUERY PARAMS
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await cultureService.getAll(cleanFilters);
      if (res.success) {
        setCulture(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          'Failed to load culture categories - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load culture categories - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const createCulture = async (formData: CultureFormData): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await cultureService.create(formData);
      if (res.success) {
        toast.success('Culture category created successfully');
        fetchCulture();
        success = true;
      } else {
        toast.error(
          'Failed to create culture category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create culture category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateCulture = async (
    id: string,
    formData: CultureFormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await cultureService.update(id, formData);
      if (res.success) {
        toast.success('Culture category updated successfully');
        fetchCulture();
        success = true;
      } else {
        toast.error(
          'Failed to update culture category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update culture category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteCulture = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await cultureService.delete(id);
      if (res.success) {
        toast.success('Culture category deleted successfully');
        fetchCulture();
        success = true;
      } else {
        toast.error(
          'Failed to delete culture category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete culture category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  const setFilter = (
    key: keyof CultureFilters,
    value: CultureFilters[keyof CultureFilters],
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
    fetchCulture();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchCulture(), 400);
    return () => clearTimeout(timer);
  }, [filters]);

  return {
    culture,
    meta,

    createCulture,
    updateCulture,
    deleteCulture,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,

    filters,
    setFilter,
    clearFilters,
  };
}
