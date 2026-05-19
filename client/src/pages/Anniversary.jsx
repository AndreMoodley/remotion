import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

const generateConfetti = (count) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#d4a853", "#f5c842", "#f5e6c8", "#ffffff", "#e8b84b"][
      Math.floor(Math.random() * 5)
    ],
    delay: Math.random() * 1.5,
    duration: 2.5 + Math.random() * 2,
    size: 4 + Math.random() * 8,
    shape: Math.random() > 0.5 ? "rounded-sm" : "rounded-full",
  }));

// Corner tick marks for film frame aesthetics
const FilmCorners = () => (
  <>
    <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#d4a853]/70" />
    <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#d4a853]/70" />
    <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#d4a853]/70" />
    <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#d4a853]/70" />
  </>
);

function Anniversary() {
  const navigate = useNavigate();
  const { title } = config.anniversaryPage;
  const [phase, setPhase] = useState("countdown"); // "countdown" | "reveal"
  const [countdownNum, setCountdownNum] = useState(5);
  const [confetti, setConfetti] = useState([]);
  const cancelledRef = useRef(false);

  useEffect(() => {
    setConfetti(generateConfetti(70));
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    let num = 5;

    const tick = () => {
      if (cancelledRef.current) return;
      if (num > 1) {
        num--;
        setCountdownNum(num);
        setTimeout(tick, 700);
      } else {
        setPhase("reveal");
        setTimeout(() => {
          if (!cancelledRef.current) navigate("/memories");
        }, 2200);
      }
    };

    const initialTimer = setTimeout(tick, 700);
    return () => clearTimeout(initialTimer);
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden relative px-4">
      {/* Falling gold confetti — only visible during reveal */}
      <AnimatePresence>
        {phase === "reveal" &&
          confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className={`absolute ${piece.shape} z-0`}
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: -20,
                width: piece.size,
                height: piece.size,
                boxShadow: `0 0 6px ${piece.color}80`,
              }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{ y: "120vh", rotate: 540, opacity: [1, 1, 0] }}
              transition={{
                duration: piece.duration,
                repeat: Infinity,
                delay: piece.delay,
                ease: "linear",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
          backgroundSize: "200px 200px",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "countdown" ? (
          <motion.div
            key={`count-${countdownNum}`}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Film circle frame */}
            <div
              className="relative w-48 h-48 rounded-full border-8 border-[#d4a853] flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%)",
                boxShadow:
                  "0 0 40px rgba(212,168,83,0.4), 0 0 80px rgba(212,168,83,0.15), inset 0 0 20px rgba(0,0,0,0.8)",
              }}
            >
              <FilmCorners />
              <span
                className="text-8xl font-black text-[#d4a853] select-none"
                style={{ textShadow: "0 0 30px rgba(212,168,83,0.8)" }}
              >
                {countdownNum}
              </span>
            </div>

            {/* "One Year" subtitle during countdown */}
            <p className="text-[#d4a853]/60 text-xs font-mono tracking-[0.4em] uppercase">
              {title}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", damping: 10, stiffness: 80 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <h1
                className="text-5xl sm:text-7xl font-black text-center tracking-wider"
                style={{
                  color: "#d4a853",
                  textShadow:
                    "0 0 60px rgba(212,168,83,0.9), 0 0 120px rgba(212,168,83,0.4), 0 4px 20px rgba(0,0,0,0.8)",
                  letterSpacing: "0.06em",
                }}
              >
                ONE YEAR ♥
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px bg-[#d4a853]/50" />
              <p className="text-[#f5e6c8]/80 text-sm font-mono tracking-widest">
                MAY 19, 2025 — MAY 19, 2026
              </p>
              <div className="w-12 h-px bg-[#d4a853]/50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Anniversary;
