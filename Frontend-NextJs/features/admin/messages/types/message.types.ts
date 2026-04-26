export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type MessageResponse = {
  data: Message[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type MessageFilters = {
  search?: string;
  isRead?: 'all' | 'true' | 'false';
  fromDate?: string;
  toDate?: string;
  page: number;
  limit: number;
};
