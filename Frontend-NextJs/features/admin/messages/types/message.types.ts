export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type MessageResponse = {
  data: Message[];
  meta: PaginationMeta;
};

export type MessageFilters = {
  page: number;
  limit: number;
  search?: string;
  isRead?: 'all' | 'true' | 'false';
  fromDate?: string;
  toDate?: string;
};
