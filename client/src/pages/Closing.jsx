import React, { useState, useEffect } from "react";
import config from "../config/config";
import { motion } from "framer-motion";
import { Player } from "@remotion/player";
import FireworkFinale from "../remotion/compositions/FireworkFinale";

function Closing() {
  const imageFiles = import.meta.glob("../assets/gifs/*.gif");
  const { message, gifName, style } = config.closingPage;
  const [gifSrc, setGifSrc] = useState(null);

  useEffect(() => {
    const loadGif = async () => {
      const gifPath = `../assets/gifs/${gifName}`;
      if (imageFiles[gifPath]) {
        const gifModule = await imageFiles[gifPath]();
        setGifSrc(gifModule.default);
      }
    };
    loadGif();
  }, [gifName]);

  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-black/20 w-full items-center justify-center overflow-clip">
      <div className="absolute inset-0 pointer-events-none">
        <Player
          component={FireworkFinale}
          durationInFrames={240}
          fps={30}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          controls={false}
          initiallyMuted
        />
      </div>

      <motion.div
        className="w-full max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col w-full items-center justify-center overflow-clip">
          <div className="w-[90%] max-w-[400px] px-8 text-center">
            {gifSrc && (
              <img
                src={gifSrc}
                alt="Celebration"
                className={`${style} mx-auto mb-3`}
              />
            )}
            <p className="text-xl font-semibold text-white drop-shadow-lg text-center">
              {message}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Closing;
