import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { showcasesService } from '../services/showcases.service';
import {
  Showcase,
  ShowcaseFilters,
  ShowcaseResponse,
} from '../types/showcases.types';

export function useShowcases() {
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [meta, setMeta] = useState<ShowcaseResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<ShowcaseFilters>({
    page: 1,
    limit: 10,
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

    isLoading,

    filters,
    setFilter,
  };
}
