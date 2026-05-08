export interface Attraction {
  title: string;
  description: string;
  attractionItems: AttractionItem[];
}

export interface AttractionItem {
  title: string;
  description: string;
  mainImageUrl: string;
  gallery: AttractionItemGallery[];
}

export interface AttractionItemGallery {
  imageUrl: string;
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
}
