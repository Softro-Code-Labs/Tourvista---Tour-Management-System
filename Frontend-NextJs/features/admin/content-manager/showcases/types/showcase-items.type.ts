import { ShowcaseItemFormData } from '../schemas/showcases.schema';

export interface ShowcaseItem extends ShowcaseItemFormData {
  id: string;
  mainImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShowcaseItemResponse {
  success: boolean;
  data: ShowcaseItem[];
  message?: string;
}
