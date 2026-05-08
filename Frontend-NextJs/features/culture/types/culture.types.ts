export interface Culture {
  title: string;
  description: string;
  cultureItems: CultureItem[];
}

export interface CultureItem {
  title: string;
  description: string;
  mainImageUrl: string;
  gallery: CultureItemGallery[];
}

export interface CultureItemGallery {
  imageUrl: string;
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
}
