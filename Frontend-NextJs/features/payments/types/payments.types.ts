export interface PaymentResponse {
  success: boolean;
  data: {
    sessionId: string;
  };
  message?: string;
}
