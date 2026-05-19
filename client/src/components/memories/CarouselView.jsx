import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SWIPE_THRESHOLD = 60;

function CarouselView({ photos, activeIndex, onChangeIndex, onOpen }) {
  const total = photos.length;

  const goNext = () => onChangeIndex((activeIndex + 1) % total);
  const goPrev = () => onChangeIndex((activeIndex - 1 + total) % total);

  // Always render up to 3 cards (prev, active, next) for visual context
  const getRelative = (offset) => {
    return (activeIndex + offset + total) % total;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 touch-pan-y">
      <div className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center select-none">
        {[-1, 0, 1].map((offset) => {
          const idx = getRelative(offset);
          const photo = photos[idx];
          if (!photo) return null;
          const isActive = offset === 0;
          return (
            <motion.div
              key={`${photo.id}-${offset}`}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              dragDirectionLock
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) goNext();
                else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
              }}
              animate={{
                x: offset * 230,
                scale: isActive ? 1 : 0.78,
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? "blur(0px)" : "blur(3px)",
                zIndex: isActive ? 10 : 5,
                rotate: offset * 6,
              }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              whileTap={isActive ? { cursor: "grabbing" } : {}}
              onClick={() => {
                if (isActive) onOpen(idx);
                else onChangeIndex(idx);
              }}
              className="absolute w-[78%] sm:w-[55%] max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 cursor-grab"
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-[#2a1f00] animate-pulse" />
              )}
            </motion.div>
          );
        })}

        {/* Nav buttons */}
        <button
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-0 sm:left-2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-0 sm:right-2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onChangeIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === activeIndex
                ? "w-8 bg-[#d4a853]"
                : "w-2 bg-[#d4a853]/30 hover:bg-[#d4a853]/60"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-white/70 text-xs sm:text-sm">
        Swipe / drag · tap center card to enter slideshow
      </p>
    </div>
  );
}

export default CarouselView;
