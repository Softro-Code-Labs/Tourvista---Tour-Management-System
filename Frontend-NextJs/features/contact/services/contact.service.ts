import { ContactFormData } from '../types/contact.types';

export const contactService = {
  async create(formData: ContactFormData) {
    const res = await fetch('/api/v1/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res.json();
  },
};
