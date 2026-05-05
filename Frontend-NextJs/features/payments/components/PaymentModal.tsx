'use client';

import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NumericFormat } from 'react-number-format';
import { CreditCard, X, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  PaymentFormData,
  paymentSchema,
} from '@/features/payments/schema/payments.schema';
import { usePayments } from '../hooks/usePayments';
import { ActionButton } from '@/components/common/ActionButton';
import { PaymentType } from '@/common/enums/payment-type.enum';
import { cn } from '@/lib/utils';

interface PaymentFormProps {
  bookingId: number;
  paymentId?: number;
  totalAmount: number;
  initialAmount: number;
  type: PaymentType;
  isExistingPayment: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export function PaymentModal({
  bookingId,
  paymentId,
  totalAmount,
  initialAmount,
  type,
  isExistingPayment,
  onCancel,
  onSuccess,
}: PaymentFormProps) {
  const { isSubmitting, initiatePayment, settlePayment } = usePayments();
  const [paymentView, setPaymentView] = useState<PaymentType | 'options'>(
    isExistingPayment ? type : 'options',
  );

  const { handleSubmit, control, setValue, watch } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema) as any,
    defaultValues: {
      bookingId: bookingId,
      amount: initialAmount,
      type: type,
    },
  });

  const currentType = watch('type');

  const onSubmit: SubmitHandler<PaymentFormData> = async (data) => {
    try {
      const result = isExistingPayment
        ? await settlePayment(paymentId!)
        : await initiatePayment(data);

      if (result) {
        toast.success(
          isExistingPayment ? 'Balance Settled!' : 'Payment Initialized!',
        );
        onSuccess();
      }
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
    }
  };

  const switchToAdvance = () => {
    setValue('type', PaymentType.ADVANCE);
    setValue('amount', totalAmount * 0.25);
    setPaymentView(PaymentType.ADVANCE);
  };

  const handleFullPayment = () => {
    setValue('type', PaymentType.FULL);
    setValue('amount', initialAmount);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {isExistingPayment ? 'Settle Balance' : 'Complete Booking'}
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              {paymentView === PaymentType.ADVANCE
                ? 'Partial Payment'
                : 'Full Secure Payment'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 relative z-10"
        >
          {paymentView === 'options' ? (
            <div className="space-y-3">
              <div className="p-6 border-2 border-blue-500/20 bg-blue-500/5 rounded-3xl mb-6">
                <p className="text-[10px] font-black text-blue-500 uppercase mb-1">
                  Payable Now
                </p>
                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <ActionButton
                text="Pay Full Amount"
                onClick={handleFullPayment}
                disabled={isSubmitting}
              />
              <ActionButton
                text="Pay Advance (25%)"
                variant="secondary"
                onClick={switchToAdvance}
              />
              <button
                type="button"
                onClick={onCancel}
                className="w-full cursor-pointer text-xs font-bold text-slate-400 py-2 hover:text-slate-600 transition-colors"
              >
                Cancel and Review
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Payment Amount ($)
                </label>
                <div className="relative">
                  <CreditCard
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500"
                    size={20}
                  />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <NumericFormat
                        value={field.value}
                        readOnly={currentType === PaymentType.FULL}
                        thousandSeparator
                        prefix="$ "
                        allowNegative={false}
                        onValueChange={(values) => {
                          const { floatValue } = values;
                          const minAllowed = totalAmount * 0.25;
                          const maxAllowed = totalAmount;

                          if (floatValue === undefined) {
                            field.onChange(0);
                            return;
                          }

                          if (floatValue < minAllowed) {
                            field.onChange(minAllowed);
                            toast.error(
                              `Minimum deposit is 25% ($${minAllowed})`,
                            );
                            return;
                          }

                          if (floatValue > maxAllowed) {
                            field.onChange(maxAllowed);
                            toast.error(`Maximum allowed is $${maxAllowed}`, {
                              id: 'max-toast',
                            });
                            return;
                          }

                          field.onChange(floatValue);
                        }}
                        className={cn(
                          'w-full pl-14 h-16 rounded-2xl text-xl font-black transition-all outline-none border-2',
                          currentType === PaymentType.FULL
                            ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-500'
                            : 'bg-white dark:bg-slate-900 border-blue-500/30 focus:border-blue-500 dark:text-white',
                        )}
                      />
                    )}
                  />
                </div>
                {currentType === PaymentType.FULL && (
                  <p className="text-[10px] text-slate-400 italic ml-1 mt-2 flex items-center gap-1">
                    <ShieldCheck size={12} /> Total balance is locked for full
                    payment.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <ActionButton
                  text={isSubmitting ? 'Processing...' : 'Confirm & Secure'}
                  type="submit"
                  disabled={isSubmitting}
                />
                {!isExistingPayment && (
                  <button
                    type="button"
                    onClick={() => setPaymentView('options')}
                    className="cursor-pointer text-xs font-bold text-slate-400 hover:text-blue-500 transition-all uppercase tracking-widest"
                  >
                    Change Payment Plan
                  </button>
                )}
              </div>
            </div>
          )}
        </form>

        {/* Footer Security Note */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Encrypted SSL Connection
          </p>
        </div>
      </div>
    </div>
  );
}
