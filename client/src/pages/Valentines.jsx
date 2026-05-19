import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import config from "../config/config";
import EnvelopeOpen from "../remotion/compositions/EnvelopeOpen";

const generateConfetti = (count) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#FFC0CB", "#FF69B4", "#FF1493", "#FFFFFF", "#ff8fa3"][
      Math.floor(Math.random() * 5)
    ],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

function Valentines() {
  const navigate = useNavigate();
  const { title, buttonText } = config.valentinesPage;
  const [confetti, setConfetti] = useState([]);
  const [opening, setOpening] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    setConfetti(generateConfetti(60));
  }, []);

  const handleEnvelopeClick = () => {
    if (opening) return;
    setOpening(true);
    // The composition is 120 frames @ 30fps = 4s. Navigate slightly earlier
    // so the wipe overlaps the route change.
    setTimeout(() => navigate("/memories"), 3400);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden relative px-4">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm z-0"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: -20,
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [0, 360],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}

      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 z-10 text-center drop-shadow-lg"
      >
        {title}
      </motion.h1>

      <motion.div
        whileHover={!opening ? { scale: 1.04 } : {}}
        whileTap={!opening ? { scale: 0.96 } : {}}
        className={`z-10 ${opening ? "" : "cursor-pointer"} w-full max-w-md`}
        onClick={!opening ? handleEnvelopeClick : undefined}
      >
        <div className="aspect-[4/3] w-full">
          <Player
            ref={playerRef}
            component={EnvelopeOpen}
            durationInFrames={120}
            fps={30}
            compositionWidth={1080}
            compositionHeight={810}
            style={{ width: "100%", height: "100%" }}
            autoPlay={opening}
            loop={false}
            controls={false}
            initiallyMuted
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-white font-semibold text-lg animate-bounce drop-shadow-md z-10"
      >
        {buttonText}
      </motion.p>
    </div>
  );
}

export default Valentines;
