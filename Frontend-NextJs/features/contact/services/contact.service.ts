import { ContactFormData } from '../types/contact.types';
import { ENV } from '@/lib/env';

export async function sendContactMessage(payload: ContactFormData) {
  const url = ENV.DATABASE_URL
    ? `${ENV.DATABASE_URL}/api/v1/contact`
    : '/api/v1/contact';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}
