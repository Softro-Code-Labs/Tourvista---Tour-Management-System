import { ShowcaseFormData } from '../schemas/showcases.schema';

export interface ShowcasesStats {
  total: number;
}

export interface Showcase extends ShowcaseFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShowcaseResponse {
  success: boolean;
  data: {
    data: Showcase[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface ShowcaseFilters {
  page: number;
  limit: number;
  search?: string;
}
