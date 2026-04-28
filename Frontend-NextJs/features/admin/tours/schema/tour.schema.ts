import { z } from 'zod';

export const tourSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  location: z
    .string()
    .nonempty('Location is required')
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location cannot exceed 100 characters'),
  duration: z
    .number('Duration is required')
    .nonnegative("Duration can't be negative")
    .min(1, 'Duration must be at least 1 day'),
  minGuests: z
    .number('Minimum guests is required')
    .nonnegative("Minimum guests can't be negative")
    .min(1, 'Minimum guests must be at least 1')
    .max(100, 'Minimum guests cannot exceed 100'),
  maxGuests: z
    .number('Maximum guests is required')
    .nonnegative("Maximum guests can't be negative")
    .min(1, 'Maximum guests must be at least 1')
    .max(100, 'Maximum guests cannot exceed 100'),
  price: z
    .number('Price is required')
    .nonnegative("Price can't be negative")
    .min(1, 'Price is required'),
  description: z
    .string()
    .nonempty('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  image: z.string().optional(),
  isActive: z.boolean(),
});

export type TourFormData = z.infer<typeof tourSchema>;
