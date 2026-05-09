export interface ReviewsState {
  total: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  isVisible: boolean;
  isFeatured: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  tour: {
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse {
  success: boolean;
  data: {
    data: Review[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface ReviewFilters {
  page?: number;
  limit?: number;
  search?: string;
  isVisible?: boolean;
  isFeatured?: boolean;
  fromDate?: string;
  toDate?: string;
}
