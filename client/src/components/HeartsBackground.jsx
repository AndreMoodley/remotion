import React from "react";
import { motion } from "framer-motion";

// --- COMPONENTS ---

// 1. Puffy Heart SVG (Same as before, just bigger base size)
const HeartSVG = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    // Soft drop shadow for depth
    style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// 2. Twinkling Star Component
const Star = ({ top, left, delay }) => {
  const size = Math.random() * 3 + 1; // Random size between 1px and 4px
  return (
    <motion.div
      className="absolute bg-white rounded-full z-0"
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        // Add a subtle white glow around stars
        boxShadow: `0 0 ${size + 2}px 1px rgba(255,255,255,0.6)`,
      }}
      // Twinkle effect
      animate={{
        opacity: [0.1, 1, 0.1],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: Math.random() * 3 + 2, // Random duration between 2-5s
        repeat: Infinity,
        delay: delay || Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  );
};

// --- MAIN COMPONENT ---

const HeartsBackground = () => {
  // --- Config for Hearts ---
  const heartCountSide = 12;
  // Softer, romantic colors
  const heartColors = ["#ff8fa3", "#ffc2d1", "#ff748c", "#e85d75"];

  const getHeartProp = () => {
    const sizeBase = 60; // Big hearts
    const scaleVar = Math.random() * 1.2 + 0.8;
    return {
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      size: sizeBase * scaleVar,
      duration: 18 + Math.random() * 10, // Slow float
      delay: Math.random() * 20,
      rotationDir: Math.random() > 0.5 ? 200 : -200, // Slow rotation
    };
  };

  // --- Config for Stars ---
  // Generate general scattered stars
  const generalStars = Array.from({ length: 50 }).map((_, i) => ({
    id: `star-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  }));

  // Helper to generate corner cluster stars
  const createCornerStars = (count, corner) => {
      return Array.from({ length: count }).map((_, i) => {
          let top, left;
          const spread = 25; // Percentage area for corners
          switch(corner) {
              case 'TL': top = Math.random()*spread; left = Math.random()*spread; break;
              case 'TR': top = Math.random()*spread; left = 100 - Math.random()*spread; break;
              case 'BL': top = 100 - Math.random()*spread; left = Math.random()*spread; break;
              case 'BR': top = 100 - Math.random()*spread; left = 100 - Math.random()*spread; break;
              default: top=0; left=0;
          }
          return { id: `corner-${corner}-${i}`, top: `${top}%`, left: `${left}%` };
      });
  };

  const cornerStars = [
      ...createCornerStars(12, 'TL'),
      ...createCornerStars(12, 'TR'),
      ...createCornerStars(12, 'BL'),
      ...createCornerStars(12, 'BR'),
  ];


  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* UPDATED: Brighter Red Gradient
         Center is bright red, fading to deep rich burgundy at corners.
      */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(circle at center, #ff4d4d 0%, #990000 70%, #4a0000 100%)",
        }}
      />

      {/* --- STARS LAYER --- */}
      {/* General Scattered Stars */}
      {generalStars.map((star) => (
        <Star key={star.id} top={star.top} left={star.left} />
      ))}
      {/* Prominent Corner Star Clusters */}
      {cornerStars.map((star) => (
        <Star key={star.id} top={star.top} left={star.left} delay={Math.random()} />
      ))}


      {/* --- HEARTS LAYER --- */}
      {/* Left Side Hearts - Hugging the edge tightly */}
      <div className="absolute top-0 left-0 w-1/4 h-full z-10">
        {Array.from({ length: heartCountSide }).map((_, i) => {
          const props = getHeartProp();
          return (
            <motion.div
              key={`left-${i}`}
              className="absolute"
              // Tight constraint: only match random * 40% of the container width
              style={{ left: `${Math.random() * 40}%` }} 
              initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
              animate={{
                y: "-25vh",
                opacity: [0, 0.9, 0],
                rotate: [0, props.rotationDir],
                scale: [0.5, 1, 0.8],
              }}
              transition={{
                duration: props.duration,
                repeat: Infinity,
                delay: props.delay,
                ease: "linear",
              }}
            >
              <HeartSVG color={props.color} size={props.size} />
            </motion.div>
          );
        })}
      </div>

      {/* Right Side Hearts - Hugging the edge tightly */}
      <div className="absolute top-0 right-0 w-1/4 h-full z-10">
        {Array.from({ length: heartCountSide }).map((_, i) => {
          const props = getHeartProp();
          return (
            <motion.div
              key={`right-${i}`}
              className="absolute"
              // Tight constraint right side
              style={{ right: `${Math.random() * 40}%` }}
              initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
              animate={{
                y: "-25vh",
                opacity: [0, 0.9, 0],
                rotate: [0, props.rotationDir],
                scale: [0.5, 1, 0.8],
              }}
              transition={{
                duration: props.duration,
                repeat: Infinity,
                delay: props.delay,
                ease: "linear",
              }}
            >
              <HeartSVG color={props.color} size={props.size} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeartsBackground;