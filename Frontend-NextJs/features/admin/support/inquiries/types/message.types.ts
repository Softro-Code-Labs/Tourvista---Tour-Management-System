export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageResponse {
  data: Message[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MessageFilters {
  search?: string;
  isRead?: 'all' | 'true' | 'false';
  fromDate?: string;
  toDate?: string;
  page: number;
  limit: number;
}
