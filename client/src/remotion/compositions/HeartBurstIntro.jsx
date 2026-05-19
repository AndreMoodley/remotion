import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Heart = ({ x, y, color, size, delay, frame, fps }) => {
  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const drift = interpolate(frame - delay, [0, 90], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame - delay, [0, 20, 70, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotate = interpolate(frame - delay, [0, 90], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, ${drift}px) scale(${appear}) rotate(${rotate}deg)`,
        opacity: fade,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

const HEARTS = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  x: 50 + (Math.random() - 0.5) * 90,
  y: 50 + (Math.random() - 0.5) * 70,
  color: ["#ff8fa3", "#ffc2d1", "#ff748c", "#e85d75", "#ffffff"][i % 5],
  size: 30 + Math.random() * 70,
  delay: Math.floor(Math.random() * 30),
}));

export const HeartBurstIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 90 },
  });
  const titleFade = interpolate(frame, [15, 30, 70, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,77,77,0.4) 0%, rgba(74,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
      }}
    >
      {HEARTS.map((h) => (
        <Heart key={h.id} {...h} frame={frame} fps={fps} />
      ))}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleFade,
            color: "white",
            fontSize: "5rem",
            fontWeight: 800,
            textShadow: "0 6px 30px rgba(255, 99, 132, 0.8)",
            letterSpacing: "0.05em",
          }}
        >
          ♥
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default HeartBurstIntro;
