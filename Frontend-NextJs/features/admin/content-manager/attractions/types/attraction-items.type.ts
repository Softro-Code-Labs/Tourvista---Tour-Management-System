import { AttractionItemFormData } from '../schemas/attractions.schema';

export interface AttractionItem extends AttractionItemFormData {
  id: string;
  mainImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttractionItemResponse {
  success: boolean;
  data: AttractionItem[];
  message?: string;
}
