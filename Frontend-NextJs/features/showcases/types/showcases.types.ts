export interface Showcase {
  title: string;
  description: string;
  showcaseItems: ShowcaseItem[];
}

export interface ShowcaseItem {
  title: string;
  description: string;
  mainImageUrl: string;
  gallery: ShowcaseItemGallery[];
}

export interface ShowcaseItemGallery {
  imageUrl: string;
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
}
