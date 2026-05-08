import { BookingStatus } from '@/common/enums/booking-status.enum';

export interface ReservationsState {
  total: number;
  [BookingStatus.PENDING]?: number;
  [BookingStatus.ACTIVE]?: number;
  [BookingStatus.CONFIRMED]?: number;
  [BookingStatus.CANCELLED]?: number;
}

export interface Reservation {
  id: number;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  tour: {
    title: string;
  };
  tourId: number;
  arrivalDate: string;
  checkoutDate: string;
  numberOfTravellers: number;
  totalAmount: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationResponse {
  success: boolean;
  data: {
    data: Reservation[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface ReservationFilters {
  page?: number;
  limit?: number;
  status?: string;
  minTotalAmount?: string;
  maxTotalAmount?: string;
  fromDate?: string;
  toDate?: string;
}
