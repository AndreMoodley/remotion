import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function FilmstripView({ photos, activeIndex, onChangeIndex, onOpen }) {
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  // 35mm-style perforations along top and bottom
  const punches = Array.from({ length: 32 }).map((_, i) => i);

  return (
    <div className="w-full py-8 px-0">
      <div
        className="relative mx-auto bg-black/85 border-y-4 border-pink-900/50"
        style={{ paddingTop: 22, paddingBottom: 22 }}
      >
        {/* Top perforations */}
        <div className="absolute inset-x-0 top-0 h-5 flex justify-around items-center pointer-events-none">
          {punches.map((p) => (
            <span
              key={`t-${p}`}
              className="block w-3 h-3 bg-pink-50 rounded-sm shadow-inner"
            />
          ))}
        </div>
        {/* Bottom perforations */}
        <div className="absolute inset-x-0 bottom-0 h-5 flex justify-around items-center pointer-events-none">
          {punches.map((p) => (
            <span
              key={`b-${p}`}
              className="block w-3 h-3 bg-pink-50 rounded-sm shadow-inner"
            />
          ))}
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory flex gap-3 px-6 py-2 scroll-pl-6 scroll-pr-6"
          style={{ scrollbarWidth: "none" }}
        >
          {photos.map((photo, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.button
                key={photo.id}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => {
                  if (isActive) onOpen(i);
                  else onChangeIndex(i);
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 snap-center w-56 sm:w-72 aspect-[3/4] rounded-md overflow-hidden border-2 ${
                  isActive ? "border-pink-400" : "border-white/10"
                } shadow-lg relative bg-pink-900/30`}
                aria-label={`Photo ${i + 1}: ${photo.caption}`}
              >
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pink-200 animate-pulse" />
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white">
                  #{i + 1}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 to-transparent">
                  <p className="text-white text-xs font-semibold">
                    {photo.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-white/70 text-xs sm:text-sm">
        Scroll · arrow keys · tap selected frame to enter slideshow
      </p>
    </div>
  );
}

export default FilmstripView;
