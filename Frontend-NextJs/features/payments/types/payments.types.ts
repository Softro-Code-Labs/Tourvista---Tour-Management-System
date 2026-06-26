export interface PaymentResponse {
  success: boolean;
  data: {
    sessionId: string;
    successIndicator: string;
    orderId: string;
    amount: string;
  };
  message?: string;
}
