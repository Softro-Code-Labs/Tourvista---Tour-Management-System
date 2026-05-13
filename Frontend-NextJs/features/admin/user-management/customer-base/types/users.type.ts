import { UserRole } from '@/common/enums/role.enum';

export interface UsersState {
  total: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserResponse {
  success: boolean;
  data: {
    data: User[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}
