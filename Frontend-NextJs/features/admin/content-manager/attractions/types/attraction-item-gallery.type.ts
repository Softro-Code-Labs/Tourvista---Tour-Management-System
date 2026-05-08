export interface AttractionItemGallery {
  id: string;
  imageUrl: string;
}

export interface AttractionItemGalleryResponse {
  success: boolean;
  data: AttractionItemGallery[];
  message?: string;
}
