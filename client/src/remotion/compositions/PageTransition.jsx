import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Heart = ({ delay, x, y, size, color }) => {
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
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export const PageTransition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const half = durationInFrames / 2;

  // Wipe in from left, then wipe out to right
  const wipeIn = interpolate(frame, [0, half], [-100, 0], {
    extrapolateRight: "clamp",
  });
  const wipeOut = interpolate(frame, [half, durationInFrames], [0, 110], {
    extrapolateLeft: "clamp",
  });
  const translateX = frame < half ? wipeIn : wipeOut;

  const hearts = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    delay: i * 3,
    x: 15 + i * 14,
    y: 30 + (i % 2 === 0 ? 0 : 35),
    size: 32 + (i % 3) * 10,
    color: ["#ffb6c8", "#ff8fa3", "#ffffff"][i % 3],
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
            "linear-gradient(120deg, #ff4d6d 0%, #c9184a 50%, #800f2f 100%)",
        }}
      />
      {hearts.map((h) => (
        <Heart key={h.id} {...h} />
      ))}
    </AbsoluteFill>
  );
};

export default PageTransition;
