import { ContactFormData } from '../types/contact.types';
import { CLIENT_ENV } from '@/lib/env.client';

export async function sendContactMessage(payload: ContactFormData) {
  const url = CLIENT_ENV.DATABASE_URL
    ? `${CLIENT_ENV.DATABASE_URL}/api/v1/contact`
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
