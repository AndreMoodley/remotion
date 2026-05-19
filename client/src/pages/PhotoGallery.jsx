import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import config from "../config/config";
import MasonryView from "../components/memories/MasonryView";
import CarouselView from "../components/memories/CarouselView";

function PhotoGallery() {
  const navigate = useNavigate();
  const { milestones } = config.memoriesPage;
  const [galleryMode, setGalleryMode] = useState("masonry");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const imageFiles = import.meta.glob("../assets/images/*", { eager: false });

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

  // Only photo milestones appear in the gallery
  const photos = useMemo(
    () =>
      milestones
        .filter((m) => !!m.imgName)
        .map((m) => ({
          id: m.id,
          caption: m.label,
          src: loadedImages[m.id] || null,
        })),
    [milestones, loadedImages]
  );

  const handleOpen = (i) => setActiveIndex(i);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0d0d0d]/85 backdrop-blur-md border-b border-[#d4a853]/20">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/memories")}
          className="flex items-center gap-1 text-[#d4a853] text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Memories
        </motion.button>

        {/* Mode toggle */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded-full p-1 border border-[#d4a853]/30">
          {[
            { id: "masonry", label: "Masonry" },
            { id: "carousel", label: "Carousel" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setGalleryMode(id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                galleryMode === id
                  ? "bg-[#d4a853] text-[#0d0d0d]"
                  : "text-[#d4a853]/70 hover:text-[#d4a853]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Spacer to balance the back button */}
        <div className="w-20" />
      </div>

      {/* Gallery content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {galleryMode === "masonry" ? (
              <MasonryView photos={photos} onOpen={handleOpen} />
            ) : (
              <CarouselView
                photos={photos}
                activeIndex={activeIndex}
                onChangeIndex={setActiveIndex}
                onOpen={handleOpen}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PhotoGallery;
