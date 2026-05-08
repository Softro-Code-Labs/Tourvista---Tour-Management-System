export interface ShowcaseItemGallery {
  id: string;
  imageUrl: string;
}

export interface ShowcaseItemGalleryResponse {
  success: boolean;
  data: ShowcaseItemGallery[];
  message?: string;
}
