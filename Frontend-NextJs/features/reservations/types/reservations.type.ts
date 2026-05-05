import { BookingStatus } from '@/common/enums/booking-status.enum';
import { PaymentType } from '@/common/enums/payment-type.enum';

export interface Reservation {
  id: number;
  tourId: number;
  arrivalDate: string;
  checkoutDate: string;
  numberOfTravellers: number;
  totalAmount: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  payment?: {
    id: number;
    amount: number;
    type: PaymentType;
  };
  tour: {
    title: string;
    minGuests: number;
    maxGuests: number;
  };
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
  page: number;
  limit: number;
}
