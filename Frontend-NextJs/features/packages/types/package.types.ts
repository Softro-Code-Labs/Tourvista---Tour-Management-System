export interface Package {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: number;
  minGuests: number;
  maxGuests: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PackagesResponse {
  success: boolean;
  data: {
    data: Package[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface PackageFilters {
  page: number;
  limit: number;
  search: string;
  isActive?: boolean;
  minPrice: string;
  maxPrice: string;
}
