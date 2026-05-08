export interface CultureItemGallery {
  id: string;
  imageUrl: string;
}

export interface CultureItemGalleryResponse {
  success: boolean;
  data: CultureItemGallery[];
  message?: string;
}
