import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import songFile from "../assets/song.mp3";
import useMemoriesGallery from "../components/memories/useMemoriesGallery";
import ViewModeBar from "../components/memories/ViewModeBar";
import GridView from "../components/memories/GridView";
import MasonryView from "../components/memories/MasonryView";
import CarouselView from "../components/memories/CarouselView";
import FilmstripView from "../components/memories/FilmstripView";
import StackedCardsView from "../components/memories/StackedCardsView";

// Defer the slideshow (and Remotion Player) until the user enters that mode
const SlideshowView = lazy(() =>
  import("../components/memories/SlideshowView")
);

function Memories() {
  const navigate = useNavigate();
  const { title, memories } = config.memoriesPage;

  const imageFiles = import.meta.glob("../assets/images/*", { eager: false });
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    const loadImages = async () => {
      const newImages = {};
      for (const memory of memories) {
        const path = `../assets/images/${memory.imgName}`;
        const loader = imageFiles[path];
        if (loader) {
          const module = await loader();
          if (cancelled) return;
          newImages[memory.id] = module.default;
        }
      }
      if (!cancelled) setLoadedImages(newImages);
    };
    loadImages();
    return () => {
      cancelled = true;
    };
  }, [memories]);

  const photos = useMemo(
    () =>
      memories.map((m) => ({
        id: m.id,
        caption: m.caption,
        src: loadedImages[m.id] || null,
      })),
    [memories, loadedImages]
  );

  const {
    mode,
    setMode,
    activeIndex,
    setActiveIndex,
    openSlideshow,
    exitSlideshow,
  } = useMemoriesGallery(photos.length);

  const renderView = () => {
    const props = {
      photos,
      activeIndex,
      onChangeIndex: setActiveIndex,
      onOpen: openSlideshow,
    };
    switch (mode) {
      case "masonry":
        return <MasonryView {...props} />;
      case "carousel":
        return <CarouselView {...props} />;
      case "filmstrip":
        return <FilmstripView {...props} />;
      case "stack":
        return <StackedCardsView {...props} />;
      case "slideshow":
        return null; // Rendered separately as overlay
      case "grid":
      default:
        return <GridView {...props} />;
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center pt-3 pb-24 overflow-x-hidden">
      <ViewModeBar mode={mode} onChange={setMode} />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 mb-2 text-center px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg relative inline-block">
          {title}
          <span className="absolute bottom-1 left-0 w-full h-3 bg-pink-400/50 -z-10 transform -rotate-1 rounded-full" />
        </h1>
        <p className="mt-2 text-white/75 text-sm">
          Press 1–6 to switch view · ← → to navigate · Enter for slideshow
        </p>
      </motion.div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode === "slideshow" ? "background" : mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-6 py-3 bg-white text-pink-500 rounded-full font-bold shadow-2xl hover:bg-pink-50 transition-colors"
          onClick={() => navigate("/letter")}
        >
          Read Letter ♥
        </motion.button>
      </div>

      {mode === "slideshow" && (
        <Suspense fallback={null}>
          <SlideshowView
            photos={photos}
            activeIndex={activeIndex}
            onChangeIndex={setActiveIndex}
            onExit={exitSlideshow}
            song={songFile}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Memories;
