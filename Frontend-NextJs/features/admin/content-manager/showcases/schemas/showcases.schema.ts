import { z } from 'zod';

export const showcaseSchema = z.object({
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

export const showcaseItemSchema = z.object({
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

export type ShowcaseFormData = z.infer<typeof showcaseSchema>;
export type ShowcaseItemFormData = z.infer<typeof showcaseItemSchema>;
