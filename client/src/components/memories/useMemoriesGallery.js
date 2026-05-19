import { useState, useEffect, useCallback, useMemo } from "react";

const MODES = ["grid", "masonry", "carousel", "filmstrip", "stack", "slideshow"];

export function useMemoriesGallery(photoCount) {
  const [mode, setMode] = useState("grid");
  const [activeIndex, setActiveIndex] = useState(0);

  const openSlideshow = useCallback((index) => {
    setActiveIndex(index);
    setMode("slideshow");
  }, []);

  const exitSlideshow = useCallback(() => {
    setMode("grid");
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (photoCount === 0 ? 0 : (i + 1) % photoCount));
  }, [photoCount]);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      photoCount === 0 ? 0 : (i - 1 + photoCount) % photoCount
    );
  }, [photoCount]);

  useEffect(() => {
    const handler = (e) => {
      // Don't trigger when typing in an input
      if (
        e.target &&
        (e.target.tagName === "INPUT" ||
          e.target.tagName === "TEXTAREA" ||
          e.target.isContentEditable)
      ) {
        return;
      }
      const key = e.key;
      // 1-6 -> modes
      if (key >= "1" && key <= "6") {
        const idx = parseInt(key, 10) - 1;
        if (MODES[idx]) {
          setMode(MODES[idx]);
          e.preventDefault();
        }
        return;
      }
      if (key === "ArrowRight") {
        next();
        e.preventDefault();
      } else if (key === "ArrowLeft") {
        prev();
        e.preventDefault();
      } else if (key === "Escape") {
        if (mode === "slideshow") {
          exitSlideshow();
          e.preventDefault();
        }
      } else if (key === "Enter") {
        if (mode !== "slideshow") {
          openSlideshow(activeIndex);
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, next, prev, exitSlideshow, openSlideshow, activeIndex]);

  return useMemo(
    () => ({
      mode,
      setMode,
      activeIndex,
      setActiveIndex,
      openSlideshow,
      exitSlideshow,
      next,
      prev,
      modes: MODES,
    }),
    [mode, activeIndex, openSlideshow, exitSlideshow, next, prev]
  );
}

export default useMemoriesGallery;
