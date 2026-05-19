import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from "../config/config";
import FilmstripView from "../components/memories/FilmstripView";
import CarouselOverlay from "../components/memories/CarouselOverlay";

function Memories() {
  const navigate = useNavigate();
  const { title, milestones } = config.memoriesPage;

  const imageFiles = import.meta.glob("../assets/images/*", { eager: false });
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    let cancelled = false;
    const loadImages = async () => {
      const newImages = {};
      for (const milestone of milestones) {
        if (!milestone.imgName) continue;
        const path = `../assets/images/${milestone.imgName}`;
        const loader = imageFiles[path];
        if (loader) {
          const module = await loader();
          if (cancelled) return;
          newImages[milestone.id] = module.default;
        }
      }
      if (!cancelled) setLoadedImages(newImages);
    };
    loadImages();
    return () => {
      cancelled = true;
    };
  }, [milestones]);

  const milestonesWithImages = useMemo(
    () =>
      milestones.map((m) => ({
        ...m,
        src: m.imgName ? loadedImages[m.id] || null : undefined,
      })),
    [milestones, loadedImages]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Photos shape for CarouselView. Filmstrip may include text-only cards in the
  // future, so map filmstrip-index <-> photo-index in case they diverge again.
  const photos = useMemo(
    () =>
      milestonesWithImages
        .filter((m) => !!m.imgName)
        .map((m) => ({ id: m.id, caption: m.label, src: m.src })),
    [milestonesWithImages]
  );

  const filmstripIdxToPhotoIdx = useMemo(() => {
    const map = {};
    let p = 0;
    milestonesWithImages.forEach((m, i) => {
      if (m.imgName) {
        map[i] = p++;
      }
    });
    return map;
  }, [milestonesWithImages]);

  // Arrow-key navigation
  useEffect(() => {
    if (overlayOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % milestones.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + milestones.length) % milestones.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [milestones.length, overlayOpen]);

  const handleCardClick = (i) => {
    setActiveIndex(i);
    if (milestonesWithImages[i]?.imgName) {
      setOverlayOpen(true);
    }
  };

  const handleOverlayChange = (photoIdx) => {
    const milestoneIdx = milestonesWithImages.findIndex(
      (m, i) => filmstripIdxToPhotoIdx[i] === photoIdx
    );
    if (milestoneIdx >= 0) setActiveIndex(milestoneIdx);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden relative">
      {/* Thin title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-0 right-0 z-20 text-center pointer-events-none"
      >
        <h1 className="text-xs font-bold tracking-[0.35em] text-[#d4a853]/75 font-mono uppercase">
          {title}
        </h1>
      </motion.div>

      {/* Filmstrip — takes full available space */}
      <div className="flex-1 flex flex-col justify-center pt-10">
        <FilmstripView
          milestones={milestonesWithImages}
          activeIndex={activeIndex}
          onChangeIndex={handleCardClick}
        />
      </div>

      {/* Bottom action buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-5 py-2.5 bg-[#1a1a1a] text-[#d4a853] border border-[#d4a853]/50 rounded-full font-bold text-sm shadow-2xl hover:border-[#d4a853] transition-colors"
          onClick={() => navigate("/gallery")}
        >
          View Gallery
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-5 py-2.5 bg-[#d4a853] text-[#0d0d0d] rounded-full font-bold text-sm shadow-2xl hover:bg-[#f5c842] transition-colors"
          onClick={() => navigate("/letter")}
        >
          Read Letter
        </motion.button>
      </div>

      <CarouselOverlay
        open={overlayOpen}
        photos={photos}
        activeIndex={filmstripIdxToPhotoIdx[activeIndex] ?? 0}
        onChangeIndex={handleOverlayChange}
        onClose={() => setOverlayOpen(false)}
      />
    </div>
  );
}

export default Memories;
