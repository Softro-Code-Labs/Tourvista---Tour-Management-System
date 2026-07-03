'use client';

import { RotateCcw } from 'lucide-react';
import { Payment } from '../types/payments.type';

interface RefundConfirmModalProps {
  target: Payment | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isRefunding: boolean;
}

export function RefundConfirmModal({
  target,
  onClose,
  onConfirm,
  isRefunding,
}: RefundConfirmModalProps) {
  if (!target) return null;

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
              ? This step reverses total financial flows.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            Cancel Action
          </button>
          <button
            onClick={onConfirm}
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
