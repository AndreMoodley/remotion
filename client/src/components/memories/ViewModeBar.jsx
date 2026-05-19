import React from "react";
import { motion } from "framer-motion";
import {
  Grid3x3,
  LayoutGrid,
  GalleryHorizontal,
  Film,
  Layers,
  Play,
} from "lucide-react";

const MODES = [
  { id: "grid", Icon: Grid3x3, label: "Grid" },
  { id: "masonry", Icon: LayoutGrid, label: "Masonry" },
  { id: "carousel", Icon: GalleryHorizontal, label: "Swipe" },
  { id: "filmstrip", Icon: Film, label: "Filmstrip" },
  { id: "stack", Icon: Layers, label: "Stack" },
  { id: "slideshow", Icon: Play, label: "Slideshow" },
];

function ViewModeBar({ mode, onChange }) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sticky top-3 z-40 mx-auto w-fit max-w-[95%] backdrop-blur-md bg-black/30 border border-white/20 rounded-full shadow-xl px-2 py-2 flex flex-wrap items-center gap-1"
    >
      {MODES.map(({ id, Icon, label }, i) => {
        const active = mode === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-label={`${label} view (key ${i + 1})`}
            title={`${label} (${i + 1})`}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              active
                ? "bg-pink-500 text-white shadow-md"
                : "text-white/85 hover:bg-white/10"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="hidden sm:inline opacity-50 text-[10px] ml-0.5">
              {i + 1}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default ViewModeBar;
