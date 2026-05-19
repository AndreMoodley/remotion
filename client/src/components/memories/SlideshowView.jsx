import React, { useMemo, useRef, useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import KenBurnsSlideshow from "../../remotion/compositions/KenBurnsSlideshow";

const FPS = 30;
const FRAMES_PER_PHOTO = 150;
const FADE_FRAMES = 18;

function SlideshowView({
  photos,
  activeIndex,
  onChangeIndex,
  onExit,
  song,
}) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const durationInFrames = useMemo(
    () =>
      Math.max(
        60,
        photos.length * (FRAMES_PER_PHOTO - FADE_FRAMES) + FADE_FRAMES
      ),
    [photos.length]
  );

  const startFrame = useMemo(
    () => activeIndex * (FRAMES_PER_PHOTO - FADE_FRAMES),
    [activeIndex]
  );

  // Seek the Player to the requested start frame whenever activeIndex changes
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.seekTo(startFrame);
    } catch {
      // best-effort
    }
  }, [startFrame]);

  // Keep Player play/pause in sync
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (playing) p.play();
      else p.pause();
    } catch {
      // best-effort
    }
  }, [playing]);

  // Keep mute in sync
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) p.mute();
      else p.unmute();
    } catch {
      // best-effort
    }
  }, [muted]);

  // Space toggles play/pause (extra binding alongside the gallery hook)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === " " || e.code === "Space") {
        setPlaying((p) => !p);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="slideshow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Player
            ref={playerRef}
            component={KenBurnsSlideshow}
            inputProps={{ photos, song: muted ? undefined : song }}
            durationInFrames={durationInFrames}
            fps={FPS}
            compositionWidth={1080}
            compositionHeight={1920}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop
            controls={false}
            initiallyMuted
          />
        </div>

        {/* Controls overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            className="p-3 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onExit}
            aria-label="Close slideshow"
            className="p-3 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-3 z-10">
          <button
            onClick={() =>
              onChangeIndex((activeIndex - 1 + photos.length) % photos.length)
            }
            aria-label="Previous"
            className="p-3 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="p-4 rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg"
          >
            {playing ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7" />
            )}
          </button>
          <button
            onClick={() => onChangeIndex((activeIndex + 1) % photos.length)}
            aria-label="Next"
            className="p-3 rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-24 inset-x-0 flex items-center justify-center gap-2 z-10 pointer-events-none">
          {photos.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? "w-10 bg-pink-400"
                  : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {muted && (
          <div className="absolute top-3 left-3 px-3 py-2 rounded-full bg-black/55 text-white text-xs backdrop-blur-sm border border-white/20 z-10">
            🔇 Tap speaker to enable music
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default SlideshowView;
