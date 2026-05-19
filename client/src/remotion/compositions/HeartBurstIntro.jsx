import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Star = ({ x, y, color, size, delay, frame, fps }) => {
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
        color,
        fontSize: size,
        textShadow: `0 0 ${size / 2}px ${color}`,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      ★
    </div>
  );
};

const STARS = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  x: 50 + (Math.random() - 0.5) * 90,
  y: 50 + (Math.random() - 0.5) * 70,
  color: ["#d4a853", "#f5c842", "#e8b84b", "#f5e6c8", "#ffffff"][i % 5],
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
          "radial-gradient(circle at center, rgba(212,168,83,0.3) 0%, rgba(74,42,0,0.2) 70%, rgba(0,0,0,0) 100%)",
      }}
    >
      {STARS.map((s) => (
        <Star key={s.id} {...s} frame={frame} fps={fps} />
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
            color: "#d4a853",
            fontSize: "5rem",
            fontWeight: 800,
            textShadow: "0 6px 30px rgba(212, 168, 83, 0.8)",
            letterSpacing: "0.05em",
          }}
        >
          ✦
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default HeartBurstIntro;
