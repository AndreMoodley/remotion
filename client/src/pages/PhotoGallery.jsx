import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import config from "../config/config";
import CarouselView from "../components/memories/CarouselView";

function PhotoGallery() {
  const navigate = useNavigate();
  const { milestones } = config.memoriesPage;
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
      <div className="sticky top-0 z-40 flex items-center px-4 py-3 bg-[#0d0d0d]/85 backdrop-blur-md border-b border-[#d4a853]/20">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/memories")}
          className="flex items-center gap-1 text-[#d4a853] text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Memories
        </motion.button>
      </div>

      <div className="flex-1">
        <CarouselView
          photos={photos}
          activeIndex={activeIndex}
          onChangeIndex={setActiveIndex}
          onOpen={handleOpen}
        />
      </div>
    </div>
  );
}

export default PhotoGallery;
