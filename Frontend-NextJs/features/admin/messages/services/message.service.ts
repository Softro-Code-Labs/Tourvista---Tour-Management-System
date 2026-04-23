import { apiRequest } from '@/lib/api/handler';
import {
  Message,
  MessageFilters,
  MessageResponse,
} from '../types/message.types';

const BASE_PATH = '/api/v1/contact';

export async function getMessages(
  filters: MessageFilters,
): Promise<MessageResponse> {
  const params = new URLSearchParams();

  params.append('page', String(filters.page));
  params.append('limit', String(filters.limit));

  if (filters.search) params.append('search', filters.search);
  if (filters.isRead !== 'all')
    params.append('isRead', filters.isRead ? 'true' : 'false');
  if (filters.fromDate) params.append('fromDate', filters.fromDate);
  if (filters.toDate) params.append('toDate', filters.toDate);

  return apiRequest<MessageResponse>(`${BASE_PATH}?${params.toString()}`);
}

export async function markMessageRead(id: number, isRead: boolean) {
  return apiRequest<Message>(`${BASE_PATH}/${id}/read`, {
    method: 'PATCH',
    body: JSON.stringify({ isRead }),
  });
}

export async function deleteMessageById(id: number) {
  return apiRequest<{ message: string }>(`${BASE_PATH}/${id}`, {
    method: 'DELETE',
  });
}
