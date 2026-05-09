import { z } from 'zod';

export const reviewsSchema = z.object({
  tourId: z.coerce.number('Tour ID is required'),
  rating: z.coerce
    .number('Rating is required')
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z
    .string()
    .nonempty('Comment is required')
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be at most 500 characters'),
});

export type ReviewFormData = z.infer<typeof reviewsSchema>;
