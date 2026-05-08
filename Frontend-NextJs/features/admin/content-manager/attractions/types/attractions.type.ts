import { AttractionFormData } from '../schemas/attractions.schema';

export interface AttractionStats {
  total: number;
}

export interface Attraction extends AttractionFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttractionResponse {
  success: boolean;
  data: {
    data: Attraction[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface AttractionFilters {
  page: number;
  limit: number;
  search?: string;
}
