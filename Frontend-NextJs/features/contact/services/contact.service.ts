import { ContactFormData } from '../types/contact.types';

export async function sendContactMessage(payload: ContactFormData) {
  const res = await fetch('/api/v1/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.message || 'Failed to send message. Please try again.',
    );
  }

  return data;
}
