export class QueryBookingDto {
  page?: number;
  limit?: number;

  // User filters
  userId?: string;

  // Admin filters
  userEmail?: string;
  status?: string;

  fromDate?: string;
  toDate?: string;
}
