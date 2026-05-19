import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// 20 perforation holes per side
const PUNCHES = Array.from({ length: 20 }).map((_, i) => i);

// SVG turbulence grain — rendered as a data URI overlay
const GRAIN_STYLE = {
  backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
  backgroundSize: "200px 200px",
};

function FilmstripView({ milestones, activeIndex, onChangeIndex }) {
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  // Auto-scroll active frame into center view
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="w-full py-6 px-0">
      {/* ── Film strip container ── */}
      <div
        className="relative mx-auto border-y-4 border-[#d4a853]/30"
        style={{
          background: "#111111",
          paddingTop: 28,
          paddingBottom: 28,
        }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ ...GRAIN_STYLE, opacity: 0.035, mixBlendMode: "overlay" }}
        />

        {/* Top perforations + "KODAK GOLD 200 ▷" label */}
        <div className="absolute inset-x-0 top-0 h-7 flex justify-around items-center pointer-events-none z-20">
          {PUNCHES.map((p) => (
            <span
              key={`t-${p}`}
              className="block w-4 h-5 bg-[#f5e6c8]/80 rounded shadow-inner flex-shrink-0"
            />
          ))}
        </div>

        {/* Bottom perforations */}
        <div className="absolute inset-x-0 bottom-0 h-7 flex justify-around items-center pointer-events-none z-20">
          {PUNCHES.map((p) => (
            <span
              key={`b-${p}`}
              className="block w-4 h-5 bg-[#f5e6c8]/80 rounded shadow-inner flex-shrink-0"
            />
          ))}
        </div>

        {/* "KODAK GOLD 200" along left edge of strip */}
        <div
          className="absolute left-1 top-0 bottom-0 flex items-center justify-center pointer-events-none z-20"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <span className="text-[7px] font-mono text-[#d4a853]/50 tracking-[0.3em] uppercase select-none">
            KODAK GOLD 200 ▷ KODAK GOLD 200 ▷
          </span>
        </div>

        {/* ── Scrollable frames ── */}
        <div
          ref={scrollRef}
          className="overflow-x-auto snap-x snap-mandatory flex gap-3 px-10 py-1 scroll-pl-10"
          style={{ scrollbarWidth: "none" }}
        >
          {/* "1 YEAR ♥" stamp before first frame */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-14 self-stretch"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            <span
              className="text-xs font-black tracking-[0.25em] text-[#d4a853] select-none"
              style={{ textShadow: "0 0 10px rgba(212,168,83,0.5)" }}
            >
              1 YEAR ♥
            </span>
          </div>

          {milestones.map((milestone, i) => {
            const isActive = i === activeIndex;
            const hasPhoto = !!milestone.imgName && !!milestone.src;

            const activeStyle = isActive
              ? {
                  boxShadow:
                    "0 0 0 2px #d4a853, 0 0 30px rgba(212,168,83,0.4), 0 0 60px rgba(212,168,83,0.15)",
                }
              : {};

            if (hasPhoto) {
              // ── Photo frame ──
              return (
                <motion.button
                  key={milestone.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => onChangeIndex(i)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-shrink-0 snap-center w-64 sm:w-80 aspect-[2/3] rounded-sm overflow-hidden border-2 relative ${
                    isActive ? "border-[#d4a853]" : "border-white/10"
                  } bg-[#1a1a1a]`}
                  style={activeStyle}
                  aria-label={`${milestone.date} — ${milestone.label}`}
                >
                  {/* Frame number */}
                  <div className="absolute top-2 left-2 z-20 text-[9px] font-mono text-[#d4a853]/70 select-none bg-black/50 px-1 rounded-sm">
                    {String(i + 1).padStart(2, "0")}A
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-2 right-2 z-20 w-2 h-2 rounded-full bg-[#d4a853] shadow-[0_0_6px_#d4a853]" />
                  )}

                  {/* Photo */}
                  {milestone.src ? (
                    <img
                      src={milestone.src}
                      alt={milestone.label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#c8a86b]/20 animate-pulse" />
                  )}

                  {/* Milestone overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                    <div className="inline-flex flex-col gap-0.5 bg-[#d4a853]/15 border border-[#d4a853]/40 rounded px-2 py-1.5 backdrop-blur-sm">
                      <span className="text-[#f5c842] text-[10px] font-mono tracking-wider">
                        {milestone.date}
                      </span>
                      <span className="text-white text-xs font-bold leading-tight">
                        {milestone.label}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            } else {
              // ── Text-only milestone title card ──
              return (
                <motion.div
                  key={milestone.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`flex-shrink-0 snap-center w-64 sm:w-80 aspect-[2/3] rounded-sm overflow-hidden border-2 relative flex flex-col items-center justify-center p-6 text-center ${
                    isActive ? "border-[#d4a853]" : "border-[#d4a853]/20"
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a00 0%, #2a1f00 50%, #1a1000 100%)",
                    ...activeStyle,
                  }}
                  onClick={() => onChangeIndex(i)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  role="button"
                  tabIndex={0}
                >
                  {/* Frame number */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-[#d4a853]/50 select-none bg-black/30 px-1 rounded-sm">
                    {String(i + 1).padStart(2, "0")}A
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#d4a853]/30" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#d4a853]/30" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#d4a853]/30" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#d4a853]/30" />

                  {/* Content */}
                  <div className="text-[#d4a853] text-xs font-mono tracking-widest mb-4 opacity-80 uppercase">
                    {milestone.date}
                  </div>
                  <div className="w-10 h-px bg-[#d4a853]/50 mb-4" />
                  <div className="text-white text-base font-bold leading-snug mb-4">
                    {milestone.label}
                  </div>
                  <div
                    className="text-[#d4a853] text-2xl opacity-50"
                    style={{ textShadow: "0 0 8px rgba(212,168,83,0.6)" }}
                  >
                    ✦
                  </div>
                </motion.div>
              );
            }
          })}

          {/* End cap spacer */}
          <div className="flex-shrink-0 w-10 self-stretch" />
        </div>
      </div>

      {/* Scroll helper */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-center text-[#d4a853]/50 text-[10px] tracking-widest font-mono uppercase"
      >
        ← scroll to explore our story →
      </motion.p>
    </div>
  );
}

export default FilmstripView;
