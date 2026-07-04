'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, DollarSign } from 'lucide-react';
import { Payment } from '../types/payments.type';
import { NumericFormat } from 'react-number-format';
import toast from 'react-hot-toast';

interface RefundConfirmModalProps {
  target: Payment | null;
  onClose: () => void;
  onConfirm: (amount: number) => Promise<void>;
  isRefunding: boolean;
}

export function RefundConfirmModal({
  target,
  onClose,
  onConfirm,
  isRefunding,
}: RefundConfirmModalProps) {
  const [refundAmount, setRefundAmount] = useState<string>('');

  // Sync initial max value when target changes
  useEffect(() => {
    if (target) {
      const initialHalf = target.amount * 0.5;
      const defaultAmount = Math.max(initialHalf, 5);
      setRefundAmount(defaultAmount.toString());
    }
  }, [target]);

  if (!target) return null;

  const handleValidateAndSubmit = async () => {
    const numericAmount = parseFloat(refundAmount);

    if (isNaN(numericAmount)) {
      toast.error('Please enter a valid amount.');
      return;
    }

    if (numericAmount < 5) {
      toast.error('Minimum refund amount must be at least $5.');
      return;
    }

    if (numericAmount > target.amount) {
      toast.error(
        `Refund amount cannot exceed the payment amount of $${target.amount.toLocaleString()}.`,
      );
      return;
    }

    await onConfirm(numericAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <RotateCcw size={18} />
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-base text-slate-900 dark:text-white uppercase tracking-wider">
              Confirm Transaction Refund
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Are you absolutely sure you want to trigger a database refund for
              transaction{' '}
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-rose-600 dark:text-rose-400">
                {target.transactionId}
              </span>
              ? This step reverses financial flows.
            </p>
          </div>
        </div>

        {/* --- Refund Input UI Block --- */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Refund Amount ($)
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500 z-10">
              <DollarSign size={20} />
            </div>
            <NumericFormat
              value={refundAmount}
              disabled={isRefunding}
              thousandSeparator
              allowNegative={false}
              fixedDecimalScale
              onValueChange={(values) => {
                const { value } = values;
                setRefundAmount(value);
              }}
              className="w-full pl-14 h-16 rounded-2xl text-xl font-black bg-white dark:bg-slate-900 border-2 border-rose-500/30 focus:border-rose-500 transition-all outline-none text-slate-900 dark:text-white"
              placeholder="0"
            />
          </div>
          <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Min amount: $5</span>
            <span>Max limit: ${target.amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isRefunding}
            className="px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors disabled:opacity-50"
          >
            Cancel Action
          </button>
          <button
            onClick={handleValidateAndSubmit}
            disabled={isRefunding}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            {isRefunding ? 'Processing...' : 'Confirm & Refund'}
          </button>
        </div>
      </div>
    </div>
  );
}
