'use client';

export default function SectionDivider() {
  return (
    <div className="relative w-full h-16 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-[3px] bg-blue-600 dark:bg-cyan-500 -skew-x-[45deg] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
    </div>
  );
}
