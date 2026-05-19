import React from "react";
import { motion } from "framer-motion";

function GridView({ photos, onOpen }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-6xl mx-auto px-3 sm:px-4 py-4"
    >
      {photos.map((photo, i) => (
        <motion.button
          key={photo.id}
          layout
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.06, type: "spring", damping: 18 }}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onOpen(i)}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-pink-900/30 shadow-lg border border-white/15 focus:outline-none focus:ring-2 focus:ring-pink-300"
          aria-label={`Open ${photo.caption}`}
        >
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-pink-200 animate-pulse" />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-2 sm:p-3">
            <p className="text-white text-xs sm:text-sm font-bold drop-shadow text-left">
              {photo.caption}
            </p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}

export default GridView;
