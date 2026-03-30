type Props = {
  title: string;
  description?: string;
  align?: 'center' | 'left';
};

export default function SectionTitle({
  title,
  description,
  align = 'center',
}: Props) {
  return (
    <div
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {/* small accent label */}
      <p className="text-sm tracking-[0.3em] uppercase text-cyan-400 mb-3">
        TourVista
      </p>

      {/* title */}
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white relative inline-block">
        {title}

        {/* underline glow */}
        <span className="absolute left-0 -bottom-2 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
      </h1>

      {/* description */}
      {description && (
        <p
          className={`mt-4 text-gray-400 dark:text-gray-300 leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}

      {/* decorative glow line */}
      <div className="mt-6 flex justify-center">
        <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60" />
      </div>
    </div>
  );
}
