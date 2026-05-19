import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Sparkle = ({ delay, x, y, size, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const fade = interpolate(frame - delay, [0, 10, 30, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: fade,
        color,
        fontSize: size,
        textShadow: `0 0 ${size / 2}px ${color}`,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      ✦
    </div>
  );
};

export const PageTransition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const half = durationInFrames / 2;

  const wipeIn = interpolate(frame, [0, half], [-100, 0], {
    extrapolateRight: "clamp",
  });
  const wipeOut = interpolate(frame, [half, durationInFrames], [0, 110], {
    extrapolateLeft: "clamp",
  });
  const translateX = frame < half ? wipeIn : wipeOut;

  const stars = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    delay: i * 3,
    x: 15 + i * 14,
    y: 30 + (i % 2 === 0 ? 0 : 35),
    size: 32 + (i % 3) * 10,
    color: ["#d4a853", "#f5c842", "#ffffff"][i % 3],
  }));

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        transform: `translateX(${translateX}%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(120deg, #b8860b 0%, #996515 50%, #4a2c00 100%)",
        }}
      />
      {stars.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}
    </AbsoluteFill>
  );
};

export default PageTransition;
