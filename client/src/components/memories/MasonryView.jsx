import React, { useMemo } from "react";
import { motion } from "framer-motion";

function MasonryView({ photos, onOpen }) {
  // Stable random rotations per photo id
  const rotations = useMemo(
    () =>
      photos.reduce((acc, p, i) => {
        // Pseudo-stable: derive from id
        const seed = (p.id ?? i) * 99;
        acc[p.id ?? i] = ((seed % 7) - 3) * 1.0;
        return acc;
      }, {}),
    [photos]
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-4">
      <div className="columns-2 sm:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        {photos.map((photo, i) => {
          const rot = rotations[photo.id ?? i] ?? 0;
          return (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
              onClick={() => onOpen(i)}
              style={{ transform: `rotate(${rot}deg)` }}
              className="mb-3 sm:mb-4 break-inside-avoid w-full block bg-white p-2 pb-8 rounded-sm shadow-xl relative focus:outline-none focus:ring-2 focus:ring-[#d4a853] transition-transform"
              aria-label={`Open ${photo.caption}`}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#d4a853]/60 rotate-[-3deg] shadow z-10" />
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-[#c8a86b]/20 animate-pulse" />
              )}
              <p className="text-center font-semibold text-[#5a3e00] mt-2 text-sm">
                {photo.caption}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default MasonryView;
