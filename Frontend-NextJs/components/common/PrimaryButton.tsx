import LoadingSpinner from './LoadingSpinner';

interface ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}

export default function PrimaryButton({
  loading,
  children,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      className="relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold overflow-hidden group transition-all duration-300 hover:from-blue-500 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {/* SHINE */}
      <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <LoadingSpinner />
            Sending...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
