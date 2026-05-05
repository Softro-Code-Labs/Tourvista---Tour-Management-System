import { CultureFormData } from '../schemas/culture.schema';

export interface Culture extends CultureFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CultureResponse {
  success: boolean;
  data: {
    data: Culture[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface CultureFilters {
  page: number;
  limit: number;
  search?: string;
}
