import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Heart, X, RefreshCw } from "lucide-react";

const SWIPE_THRESHOLD = 120;

function StackedCard({ photo, isTop, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-22, 0, 22]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -40], [1, 0]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      style={isTop ? { x, rotate } : {}}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) onSwipe("right");
        else if (info.offset.x < -SWIPE_THRESHOLD) onSwipe("left");
      }}
      whileTap={isTop ? { cursor: "grabbing" } : {}}
      className="absolute inset-0 rounded-2xl overflow-hidden bg-pink-900/30 border-4 border-white/80 shadow-2xl"
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
        <div className="w-full h-full bg-pink-200 animate-pulse" />
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <p className="text-white text-xl font-bold drop-shadow">{photo.caption}</p>
      </div>

      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 px-3 py-1.5 border-4 border-pink-400 text-pink-300 rounded-md font-extrabold text-2xl rotate-[-12deg] bg-black/40"
          >
            LOVED ♥
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 px-3 py-1.5 border-4 border-white/70 text-white rounded-md font-extrabold text-2xl rotate-[12deg] bg-black/40"
          >
            SKIP
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function StackedCardsView({ photos, activeIndex, onChangeIndex, onOpen }) {
  const [history, setHistory] = useState([]); // direction history per swipe

  const total = photos.length;

  const handleSwipe = (direction) => {
    setHistory((h) => [...h, direction]);
    onChangeIndex((activeIndex + 1) % total);
  };

  const reset = () => {
    setHistory([]);
    onChangeIndex(0);
  };

  // Stack: top is activeIndex, then next two underneath
  const visible = [0, 1, 2]
    .map((offset) => ({ photo: photos[(activeIndex + offset) % total], offset }))
    .filter((v) => v.photo);

  return (
    <div className="w-full max-w-md mx-auto px-3 py-6 flex flex-col items-center">
      <div className="relative w-full max-w-[360px] aspect-[3/4]">
        <AnimatePresence>
          {[...visible].reverse().map(({ photo, offset }) => {
            const isTop = offset === 0;
            return (
              <motion.div
                key={`${photo.id}-${activeIndex}-${offset}`}
                initial={{ scale: 0.92 - offset * 0.04, y: offset * 10, opacity: 0.7 }}
                animate={{ scale: 1 - offset * 0.04, y: offset * 10, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", damping: 18, stiffness: 200 }}
                className="absolute inset-0"
                style={{ zIndex: 10 - offset }}
              >
                <StackedCard
                  photo={photo}
                  isTop={isTop}
                  onSwipe={handleSwipe}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => handleSwipe("left")}
          aria-label="Skip"
          className="p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/30"
        >
          <X className="w-6 h-6" />
        </button>
        <button
          onClick={reset}
          aria-label="Reset stack"
          className="p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/30"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
        <button
          onClick={() => onOpen(activeIndex)}
          aria-label="View in slideshow"
          className="p-4 rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg"
        >
          <Heart className="w-6 h-6" fill="currentColor" />
        </button>
      </div>

      <p className="mt-4 text-center text-white/70 text-xs sm:text-sm">
        Drag the card · ♥ opens slideshow · {history.length} of {total} swiped
      </p>
    </div>
  );
}

export default StackedCardsView;
