import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { attractionsService } from '../services/attractions.service';
import {
  Attraction,
  AttractionFilters,
  AttractionResponse,
} from '../types/attractions.types';

export function useAttractions() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [meta, setMeta] = useState<AttractionResponse['data']['meta']>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<AttractionFilters>({
    page: 1,
    limit: 10,
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

    isLoading,

    filters,
    setFilter,
  };
}
