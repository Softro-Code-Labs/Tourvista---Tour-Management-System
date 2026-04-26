'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export function DeleteConfirmDialog({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  title,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8 border-none shadow-2xl [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:transition-all [&>button]:hover:bg-slate-100 dark:[&>button]:hover:bg-slate-800">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
          </div>
          <div className="text-center space-y-2">
            <DialogTitle className="text-xl font-black">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Are you sure you want to delete{' '}
              <span className="text-slate-900 dark:text-white font-bold">
                "{title}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-3 mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl font-bold text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white cursor-pointer font-bold rounded-2xl shadow-lg shadow-red-500/25 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Trash2 size={18} />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
