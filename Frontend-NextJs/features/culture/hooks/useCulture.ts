import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { cultureService } from '../services/culture.service';
import {
  Culture,
  CultureFilters,
  CultureResponse,
} from '../types/culture.types';

export function useCulture() {
  const [culture, setCulture] = useState<Culture[]>([]);
  const [meta, setMeta] = useState<CultureResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<CultureFilters>({
    page: 1,
    limit: 10,
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

    isLoading,

    filters,
    setFilter,
  };
}
