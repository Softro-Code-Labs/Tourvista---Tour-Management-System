'use client';

export default function SectionDivider() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          h-[1px] w-2/3 rounded-full
          bg-gradient-to-r from-transparent via-blue-500/20 to-transparent
          dark:via-cyan-500/30
        "
      />
    </div>
  );
}
