import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'default' | 'secondary' | 'outline' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export function ActionButton({
  text,
  onClick,
  type = 'button',
  variant = 'default',
  className,
  disabled,
}: ActionButtonProps) {
  const variantStyles = {
    default:
      'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)]',
    secondary:
      'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]',
    danger:
      'bg-gradient-to-br from-red-500 via-red-600 to-rose-800 text-white shadow-[0_10px_20px_-10px_rgba(239,68,68,0.5)]',
    outline:
      'border-2 border-slate-200 dark:border-slate-800 bg-white/5 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:border-blue-400/50',
    ghost: 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'group relative h-14 w-full overflow-hidden rounded-2xl px-8 transition-all cursor-pointer duration-500',
        'font-black text-[11px] uppercase tracking-[0.25em] antialiased',
        'active:scale-95 hover:-translate-y-1',
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed grayscale',
        className,
      )}
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]" />

      <span className="absolute top-0 -left-[100%] h-full w-[50%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[120%]" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {disabled ? <Loader2 className="animate-spin" /> : null}
        {text}
      </span>
    </Button>
  );
}
