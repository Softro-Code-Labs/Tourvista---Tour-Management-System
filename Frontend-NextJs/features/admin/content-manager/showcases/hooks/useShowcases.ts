import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { showcasesService } from '../services/showcases.service';
import { ShowcaseFormData } from '../schemas/showcases.schema';
import {
  Showcase,
  ShowcaseFilters,
  ShowcaseResponse,
} from '../types/showcases.type';

export function useShowcases() {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [meta, setMeta] = useState<ShowcaseResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<ShowcaseFilters>({
    page: 1,
    limit: 10,
    search: '',
  });

  const fetchShowcases = useCallback(async () => {
    setIsLoading(true);
    try {
      // CLEAN FILTERS TO AVOID SENDING UNNECESSARY QUERY PARAMS
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '' && v !== undefined),
      );

      const res = await showcasesService.getAll(cleanFilters);
      if (res.success) {
        setShowcases(res.data.data);
        setMeta(res.data.meta);
      } else {
        toast.error(
          'Failed to load showcases categories - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to load showcases categories - ' +
          (err.message || 'Unknown error'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const createShowcase = async (
    formData: ShowcaseFormData,
  ): Promise<boolean> => {
    setIsCreating(true);
    let success = false;
    try {
      const res = await showcasesService.create(formData);
      if (res.success) {
        toast.success('Showcase category created successfully');
        fetchShowcases();
        success = true;
      } else {
        toast.error(
          'Failed to create showcase category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to create showcase category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsCreating(false);
      return success;
    }
  };

  const updateShowcase = async (
    id: string,
    formData: ShowcaseFormData,
  ): Promise<boolean> => {
    setIsUpdating(true);
    let success = false;
    try {
      const res = await showcasesService.update(id, formData);
      if (res.success) {
        toast.success('Showcase category updated successfully');
        fetchShowcases();
        success = true;
      } else {
        toast.error(
          'Failed to update showcase category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to update showcase category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsUpdating(false);
      return success;
    }
  };

  const deleteShowcase = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    let success = false;
    try {
      const res = await showcasesService.delete(id);
      if (res.success) {
        toast.success('Showcase category deleted successfully');
        fetchShowcases();
        success = true;
      } else {
        toast.error(
          'Failed to delete showcase category - ' +
            (res.message || 'Unknown error'),
        );
      }
    } catch (err: any) {
      toast.error(
        'Failed to delete showcase category - ' +
          (err.message || 'Unknown error'),
      );
      success = false;
    } finally {
      setIsDeleting(false);
      return success;
    }
  };

  const setFilter = (
    key: keyof ShowcaseFilters,
    value: ShowcaseFilters[keyof ShowcaseFilters],
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
    fetchShowcases();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchShowcases(), 400);
    return () => clearTimeout(timer);
  }, [filters]);

  return {
    showcases,
    meta,

    createShowcase,
    updateShowcase,
    deleteShowcase,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,

    filters,
    setFilter,
    clearFilters,
  };
}
