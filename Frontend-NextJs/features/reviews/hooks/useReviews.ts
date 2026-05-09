import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '../services/reviews.service';
import { ReviewFormData } from '../schemas/reviews.schema';
import toast from 'react-hot-toast';

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews', 'featured'],
    queryFn: reviewsService.getAll,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewFormData) => reviewsService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Thank you! Your review has been submitted.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    },
  });
};
