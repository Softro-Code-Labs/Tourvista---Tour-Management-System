export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type MessageFilters = {
  page: number;
  limit: number;
  search: string;
  isRead: 'all' | 'true' | 'false';
  fromDate: string;
  toDate: string;
};
