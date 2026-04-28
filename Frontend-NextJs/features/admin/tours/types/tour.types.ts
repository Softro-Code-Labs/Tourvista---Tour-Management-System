import { TourFormData } from '../schema/tour.schema';

export interface Tour extends TourFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface TourStats {
  total: number;
  active: number;
  inactive: number;
}

export interface TourResponse {
  success: boolean;
  data: {
    data: Tour[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface TourFilters {
  search?: string;
  isActive?: boolean;
  minPrice?: string;
  maxPrice?: string;
  page: number;
  limit: number;
}
