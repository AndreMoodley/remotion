import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CarouselView from "./CarouselView";

function CarouselOverlay({ open, photos, activeIndex, onChangeIndex, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while overlay is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="carousel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex flex-col"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close carousel"
            className="absolute top-4 left-4 z-[70] p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-[#d4a853] border border-[#d4a853]/40 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center w-full"
          >
            <CarouselView
              photos={photos}
              activeIndex={activeIndex}
              onChangeIndex={onChangeIndex}
              onOpen={() => {}}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CarouselOverlay;
