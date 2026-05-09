export interface Review {
  rating: number;
  comment: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  tour: {
    title: string;
  };
}

export interface ReviewResponse {
  success: boolean;
  data: Review[];

  message?: string;
}
