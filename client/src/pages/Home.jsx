import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import config from "../config/config";
import HeartBurstIntro from "../remotion/compositions/HeartBurstIntro";
import LyricalTextReveal from "../remotion/compositions/LyricalTextReveal";

function Home() {
  const navigate = useNavigate();
  const { sentencePerSlide, slides } = config.homePage;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [showIntro, setShowIntro] = useState(true);

  const currentSlide = slides[currentIndex];

  useEffect(() => {
    if (!showIntro) return;
    const t = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(t);
  }, [showIntro]);

  const handleClick = () => {
    if (showIntro) {
      setShowIntro(false);
      return;
    }
    if (visibleCount < Math.min(sentencePerSlide, currentSlide.length)) {
      setVisibleCount(visibleCount + 1);
    } else if (currentIndex < slides.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setVisibleCount(1);
      }, 350);
    } else {
      setTimeout(() => {
        navigate("/anniversary");
      }, 350);
    }
  };

  const revealedSentences = useMemo(
    () => currentSlide.slice(0, visibleCount),
    [currentSlide, visibleCount]
  );

  const revealDuration = Math.max(60, revealedSentences.length * 24 + 30);

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-black/20 cursor-pointer w-full items-center justify-center overflow-clip relative"
      onClick={handleClick}
    >
      <div className="w-[90%] max-w-[480px] h-[55vh] sm:h-[60vh] relative">
        <AnimatePresence mode="wait">
          {!showIntro && (
            <motion.div
              key={`${currentIndex}-${visibleCount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Player
                component={LyricalTextReveal}
                inputProps={{ sentences: revealedSentences }}
                durationInFrames={revealDuration}
                fps={30}
                compositionWidth={540}
                compositionHeight={720}
                style={{ width: "100%", height: "100%" }}
                autoPlay
                loop={false}
                controls={false}
                initiallyMuted
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <Player
              component={HeartBurstIntro}
              durationInFrames={90}
              fps={30}
              compositionWidth={1080}
              compositionHeight={1920}
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop={false}
              controls={false}
              initiallyMuted
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showIntro ? 0 : 0.7, y: 0 }}
        transition={{ duration: 0.5, delay: showIntro ? 0 : 0.3 }}
        className="absolute bottom-6 text-white/80 text-sm font-medium pointer-events-none drop-shadow-md"
      >
        tap anywhere to continue ♥
      </motion.div>
    </div>
  );
}

export default Home;
