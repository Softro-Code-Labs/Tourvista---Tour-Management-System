'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, ExternalLink, Globe2 } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (value: string) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Wiki search failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#030712] overflow-hidden py-20">
      {/* HIGH-END BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]" />

      <div className="relative z-10 text-center max-w-4xl px-6">
        {/* BRAND BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 transition-transform hover:scale-105">
          <Globe2 className="w-3 h-3 text-blue-400" />
          <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-[10px]">
            TourVista Sri Lanka
          </span>
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-3 tracking-tight leading-tight">
          Your Journey to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Serendipity Starts Here
          </span>
        </h1>

        <p className="text-slate-400 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Powered by real-time intelligence. Search for any landmark, historical
          site, or hidden gem across the island.
        </p>

        {/* INTERACTIVE SEARCH UI */}
        <div className="mt-10 max-w-2xl mx-auto group">
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-2 transition-all duration-300 group-focus-within:border-blue-500/50 group-focus-within:ring-4 group-focus-within:ring-blue-500/10">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 dark:bg-slate-900/50 text-white placeholder:text-slate-500 outline-none transition-all"
              />
              {isLoading && (
                <div className="absolute right-4 animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
              )}
            </div>

            {/* RESULTS DROPDOWN */}
            {results.length > 0 && (
              <div className="mt-2 text-left space-y-1 max-h-80 overflow-y-auto custom-scrollbar p-2">
                {results.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all group/item"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                      <MapPin size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-bold text-sm tracking-wide">
                          {item.title}
                        </p>
                        <ExternalLink
                          size={12}
                          className="text-slate-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* QUICK SUGGESTIONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Sigiriya', 'Ella Rock', 'Galle Fort', 'Nine Arch Bridge'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-5 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all text-xs font-medium uppercase tracking-wider"
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
