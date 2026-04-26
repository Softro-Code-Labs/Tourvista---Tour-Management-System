import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email('Please enter a valid email'),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z
    .string()
    .min(1, 'Please enter your message')
    .min(10, 'Message is too short')
    .max(500, 'Message is too long'),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
