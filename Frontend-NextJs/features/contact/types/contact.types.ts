import { contactSchema } from '../schemas/contact.schema';
import { z } from 'zod';

export type ContactFormData = z.infer<typeof contactSchema>;

// Backend response structure
export type ContactResponse = {
  success: boolean;
  message: string;
  data?: any;
};
