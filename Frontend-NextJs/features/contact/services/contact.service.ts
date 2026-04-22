import { ContactFormData } from '../types/contact.types';

export async function sendContactMessage(payload: ContactFormData) {
  const res = await fetch('/api/v1/contact', {
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
