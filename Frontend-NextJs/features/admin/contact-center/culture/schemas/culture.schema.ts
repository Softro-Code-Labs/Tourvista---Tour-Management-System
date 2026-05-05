import { z } from 'zod';

export const cultureSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .nonempty('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),
});

export const cultureItemSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .nonempty('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),
});

export type CultureFormData = z.infer<typeof cultureSchema>;
export type CultureItemFormData = z.infer<typeof cultureItemSchema>;
