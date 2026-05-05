import { contactSchema } from '../schemas/contact.schema';
import { z } from 'zod';

export type ContactFormData = z.infer<typeof contactSchema>;

// BACKEND RESPONSE STRUCTURE
export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}
