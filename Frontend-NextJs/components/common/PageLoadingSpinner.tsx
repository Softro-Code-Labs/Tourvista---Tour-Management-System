interface Props {
  text?: string;
}

export const PageLoadingSpinner = ({ text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full space-y-4">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        {/* Animated Spin Ring */}
        <div className="absolute top-0 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">
        {text ? text : ''}
      </p>
    </div>
  );
};
