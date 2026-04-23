import { apiRequest } from '@/lib/api/handler';
import { ContactFormData, ContactResponse } from '../types/contact.types';

const BASE_PATH = '/api/v1/contact';

export async function sendContactMessage(
  payload: ContactFormData,
): Promise<ContactResponse> {
  return apiRequest<ContactResponse>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
