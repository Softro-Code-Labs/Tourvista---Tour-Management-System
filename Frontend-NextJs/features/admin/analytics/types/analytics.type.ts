export interface DashboardMetricsResponse {
  success: boolean;
  data: {
    cards: {
      totalUsers: number;
      totalTourPlans: number;
      totalIncome: number;
      totalBookings: number;
      totalMessages: number;
      totalReviews: number;
    };
    monthlyData: {
      month: string;
      users: number;
      bookings: number;
      income: number;
      messages: number;
      reviews: number;
    }[];
  };
}
