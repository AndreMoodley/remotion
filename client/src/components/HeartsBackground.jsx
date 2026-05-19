import React from "react";
import { motion } from "framer-motion";

const GOLD_COLORS = ["#d4a853", "#f5c842", "#e8b84b", "#f5e6c8"];

// Twinkling star — unchanged
const Star = ({ top, left, delay }) => {
  const size = Math.random() * 3 + 1;
  return (
    <motion.div
      className="absolute bg-white rounded-full z-0"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `0 0 ${size + 2}px 1px rgba(255,255,255,0.6)`,
      }}
      animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: delay || Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  );
};

// Golden ✦ particle that floats upward
const GoldenParticle = ({ left, delay, duration, fontSize, color, opacity }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{ left, bottom: "-5%", fontSize, color, textShadow: `0 0 8px ${color}80` }}
    animate={{
      y: ["0vh", "-110vh"],
      opacity: [0, opacity, opacity, 0],
      rotate: [0, Math.random() > 0.5 ? 180 : -180],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
  >
    ✦
  </motion.div>
);

// Generate particles once at module level so values don't re-randomize on re-render
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 25,
  duration: 12 + Math.random() * 10,
  fontSize: `${10 + Math.random() * 14}px`,
  color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
  opacity: 0.4 + Math.random() * 0.4,
}));

// Generate star data once at module level
const GENERAL_STARS = Array.from({ length: 50 }).map((_, i) => ({
  id: `star-${i}`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
}));

const createCornerStars = (count, corner) =>
  Array.from({ length: count }).map((_, i) => {
    const spread = 25;
    let top, left;
    switch (corner) {
      case "TL": top = Math.random() * spread; left = Math.random() * spread; break;
      case "TR": top = Math.random() * spread; left = 100 - Math.random() * spread; break;
      case "BL": top = 100 - Math.random() * spread; left = Math.random() * spread; break;
      case "BR": top = 100 - Math.random() * spread; left = 100 - Math.random() * spread; break;
      default: top = 0; left = 0;
    }
    return { id: `corner-${corner}-${i}`, top: `${top}%`, left: `${left}%` };
  });

const CORNER_STARS = [
  ...createCornerStars(12, "TL"),
  ...createCornerStars(12, "TR"),
  ...createCornerStars(12, "BL"),
  ...createCornerStars(12, "BR"),
];

const AnniversaryBackground = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
    {/* Dark gold radial gradient */}
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: "radial-gradient(circle at center, #0d0d0d 0%, #1a0d00 100%)",
      }}
    />

    {/* Star field */}
    {GENERAL_STARS.map((star) => (
      <Star key={star.id} top={star.top} left={star.left} />
    ))}
    {CORNER_STARS.map((star) => (
      <Star key={star.id} top={star.top} left={star.left} delay={Math.random()} />
    ))}

    {/* Golden floating particles */}
    {PARTICLES.map((p) => (
      <GoldenParticle key={p.id} {...p} />
    ))}
  </div>
);

export default AnniversaryBackground;
