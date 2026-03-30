'use client';

import { useState } from 'react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const searchWiki = async (value: string) => {
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=5&namespace=0&format=json&origin=*`,
    );

    const data = await res.json();

    setResults(
      data[1].map((title: string, i: number) => ({
        title,
        description: data[2][i],
        link: data[3][i],
      })),
    );
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0b1220] overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      {/* travel image overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528127269322-539801943592')",
        }}
      />

      <div className="relative z-10 text-center max-w-3xl px-4">
        {/* Brand */}
        <p className="text-blue-400 font-semibold tracking-widest uppercase text-sm">
          TourVista Tours ✈️
        </p>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mt-3">
          Explore Sri Lanka in a New Way 🇱🇰
        </h1>

        <p className="text-gray-300 mt-4 text-lg">
          Live Wikipedia search • Real destinations • Instant travel insights
        </p>

        {/* Search box */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4">
          <input
            value={query}
            onChange={(e) => searchWiki(e.target.value)}
            placeholder="Search destinations, history, culture..."
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* results */}
          {results.length > 0 && (
            <div className="mt-4 text-left space-y-2 max-h-64 overflow-auto">
              {results.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  className="block p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* quick search tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {['Sri Lanka', 'Ella', 'Sigiriya', 'Galle', 'Kandy'].map((tag) => (
            <button
              key={tag}
              onClick={() => searchWiki(tag)}
              className="px-4 py-2 bg-white/10 border border-white/10 text-gray-200 rounded-full hover:bg-white/20 transition text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
