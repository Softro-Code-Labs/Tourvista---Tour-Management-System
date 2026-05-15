import { PaymentMethod } from '@/common/enums/payment-method.enum';
import { PaymentStatus } from '@/common/enums/payment-status.enum';
import { PaymentType } from '@/common/enums/payment-type.enum';

export interface PaymentsState {
  total: number;
}

export interface Payment {
  id: number;
  amount: number;
  type: PaymentType;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  data: {
    data: Payment[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface PaymentFilters {
  page?: number;
  limit?: number;
  minAmount?: number;
  maxAmount?: number;
  type?: PaymentType;
  status?: PaymentStatus;
  fromDate?: string;
  toDate?: string;
}
