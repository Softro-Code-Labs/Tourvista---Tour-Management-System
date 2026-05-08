'use client';

import { useAttractions } from '@/features/attractions/hooks/useAttractions';
import { Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import PlaceSection from '../../../components/sections/PlaceSection';
import Pagination from '../../../components/common/Pagination';

export default function AttractionsUserList() {
  const { attractions, meta, setFilter, isLoading } = useAttractions();

  // LOADING ANIMATION
  if (isLoading && attractions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-48 space-y-12">
        <div className="relative">
          {/* CIRCULAR LIGHT ROTATION  */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-8 border border-dashed border-blue-500/20 rounded-full"
          />

          {/* STAGGERED ECHO RINGS */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-sm"
            />
          ))}

          {/* CENTRAL FOCUS POINT */}
          <div className="relative bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
            <motion.div
              animate={{
                scale: [0.9, 1.1, 0.9],
                filter: [
                  'contrast(1) saturate(1)',
                  'contrast(1.2) saturate(1.5)',
                  'contrast(1) saturate(1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-600 dark:text-blue-400"
            >
              <MapPin size={40} fill="currentColor" fillOpacity={0.2} />
            </motion.div>

            {/* FLOATING SCANNING SPARKLE */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-1 text-amber-400"
            >
              <Sparkles size={16} />
            </motion.div>
          </div>
        </div>

        {/* MINIMALIST TEXT LOGIC */}
        <div className="flex flex-col items-center space-y-3">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-bold tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase"
          >
            Locating Experiences
          </motion.p>

          <div className="h-[2px] w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-48, 48] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </div>
        </div>
      </div>
    );
  }

  // NO DATA STATE
  if (!isLoading && attractions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-4xl mx-auto py-24 px-6 flex flex-col items-center"
      >
        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[120px]"
          />
        </div>

        {/* FLOATING ICON SET */}
        <div className="relative mb-12">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20 p-7 bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none rounded-[2.5rem] border border-slate-100 dark:border-slate-800"
          >
            <MapPin
              className="text-blue-600 dark:text-blue-400"
              size={40}
              strokeWidth={1.5}
            />
          </motion.div>

          {/* SMALLER FLOATING ACCENTS */}
          <motion.div
            animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute -top-4 -right-4 p-3 bg-blue-500 text-white rounded-2xl shadow-lg"
          >
            <Sparkles size={18} />
          </motion.div>
        </div>

        {/* CONTENT TYPOGRAPHY */}
        <div className="text-center space-y-6 max-w-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Crafting Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Unforgettable Journey
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed px-4"
          >
            Our curators are currently exploring new horizons to bring you a
            refined collection of Sri Lanka’s best-kept secrets.
          </motion.p>
        </div>

        {/* ELEGANT STATUS BADGE */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center gap-4 px-8 py-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 animate-pulse"
              />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            Coming Soon
          </span>
        </motion.div>
      </motion.div>
    );
  }

  // MAIN CONTENT
  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        {attractions.map((section, index) => (
          <PlaceSection
            key={index}
            title={section.title}
            description={section.description}
            places={section.attractionItems}
          />
        ))}
      </motion.div>

      {meta.totalPages > 1 && (
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            onPageChange={(p) => setFilter('page', p)}
            onLimitChange={(l) => {
              setFilter('limit', l);
              setFilter('page', 1);
            }}
          />
        </div>
      )}
    </div>
  );
}
