import { CultureItemFormData } from '../schemas/culture.schema';

export interface CultureItem extends CultureItemFormData {
  id: string;
  mainImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CultureItemResponse {
  success: boolean;
  data: CultureItem[];
  message?: string;
}
