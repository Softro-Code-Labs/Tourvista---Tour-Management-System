export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className}`}
  />
);
