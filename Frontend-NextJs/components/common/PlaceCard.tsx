export default function PlaceCard({
  title,
  description,
  image,
}: Readonly<{ title: string; description: string; image: string }>) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer
      bg-white/5 backdrop-blur-xl border border-white/10
      shadow-lg hover:shadow-2xl
      transition-all duration-500 hover:-translate-y-2"
    >
      {/* image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* content */}
      <div className="p-5 text-black dark:text-white">
        <h3 className="text-lg font-semibold group-hover:text-cyan-300 transition">
          {title}
        </h3>

        <p className="text-sm text-gray-400 dark:text-gray-300 mt-2 leading-relaxed">
          {description}
        </p>

        {/* optional accent line */}
        <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
      </div>
    </div>
  );
}
