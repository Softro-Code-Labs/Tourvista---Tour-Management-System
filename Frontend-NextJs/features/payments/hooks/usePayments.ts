import { useState } from 'react';
import { PaymentFormData } from '../schema/payments.schema';
import { paymentService } from '../services/payments.service';
import toast from 'react-hot-toast';

export function usePayments() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initiatePayment = async (data: PaymentFormData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await paymentService.create(data);
      if (res.success) {
        toast.success('Payment made successfully!');
        return true;
      } else {
        toast.error(
          res?.message || 'Failed to make payment. Please try again.',
        );
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Server error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const settlePayment = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await paymentService.update(id);
      if (res.success) {
        toast.success('Payment updated successfully!');
        return true;
      } else {
        toast.error(
          res?.message || 'Failed to update payment. Please try again.',
        );
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Server error occurred. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, initiatePayment, settlePayment };
}
