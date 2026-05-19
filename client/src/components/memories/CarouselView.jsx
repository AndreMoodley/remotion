import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARD_STRIDE = 230;
const MAX_SKIP = 5;
const VELOCITY_PROJECTION = 0.15;

function CarouselView({ photos, activeIndex, onChangeIndex, onOpen }) {
  const total = photos.length;

  const goNext = () => onChangeIndex((activeIndex + 1) % total);
  const goPrev = () => onChangeIndex((activeIndex - 1 + total) % total);

  const getRelative = (offset) => (activeIndex + offset + total) % total;

  // Velocity-aware drag end: project the throw to decide how many photos to skip
  const handleDragEnd = (_, info) => {
    const projected = info.offset.x + info.velocity.x * VELOCITY_PROJECTION;
    const steps = Math.round(projected / CARD_STRIDE);
    if (steps === 0) return;
    const clamped = Math.max(-MAX_SKIP, Math.min(MAX_SKIP, steps));
    // dragging right (positive offset) = going BACK, so negate
    const next = (activeIndex - clamped + total) % total;
    onChangeIndex(next);
  };

  // === Scrubber state ===
  const trackRef = useRef(null);
  const thumbX = useMotionValue(0);
  const isDraggingThumb = useRef(false);

  const getTrackWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    return el.getBoundingClientRect().width;
  };

  // Keep thumb in sync with activeIndex unless user is actively dragging it
  useEffect(() => {
    if (isDraggingThumb.current) return;
    const w = getTrackWidth();
    if (total <= 1 || w === 0) return;
    const target = (activeIndex / (total - 1)) * w;
    animate(thumbX, target, { type: "spring", damping: 24, stiffness: 220 });
  }, [activeIndex, total, thumbX]);

  const indexFromX = (x) => {
    const w = getTrackWidth();
    if (w === 0) return 0;
    const clamped = Math.max(0, Math.min(w, x));
    return Math.round((clamped / w) * (total - 1));
  };

  const handleThumbDrag = () => {
    const i = indexFromX(thumbX.get());
    if (i !== activeIndex) onChangeIndex(i);
  };

  const handleTrackPointerDown = (e) => {
    // Skip taps that originate on the thumb itself
    if (e.target.dataset.scrubberThumb) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const i = indexFromX(x);
    onChangeIndex(i);
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
              dragElastic={0.25}
              dragMomentum={false}
              dragDirectionLock
              onDragEnd={handleDragEnd}
              animate={{
                x: offset * CARD_STRIDE,
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

      {/* Scrubber */}
      <div className="mt-8 mx-6 relative h-8 select-none">
        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-2 rounded-full bg-[#d4a853]/15 cursor-pointer overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-[#d4a853]"
            style={{
              width: total > 1 ? `${(activeIndex / (total - 1)) * 100}%` : "0%",
            }}
          />
        </div>
        <motion.div
          data-scrubber-thumb="true"
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            isDraggingThumb.current = true;
          }}
          onDrag={handleThumbDrag}
          onDragEnd={() => {
            isDraggingThumb.current = false;
          }}
          style={{ x: thumbX }}
          className="absolute top-1/2 -translate-y-1/2 -ml-2.5 w-5 h-5 rounded-full bg-[#f5c842] shadow-lg border-2 border-[#0d0d0d] cursor-grab active:cursor-grabbing touch-none"
        />
        <div className="absolute -bottom-5 left-0 right-0 text-center text-[10px] font-mono text-[#d4a853]/60">
          {activeIndex + 1} / {total}
        </div>
      </div>

      <p className="mt-8 text-center text-white/70 text-xs sm:text-sm">
        Swipe · flick to skip · drag the bar to jump
      </p>
    </div>
  );
}

export default CarouselView;
