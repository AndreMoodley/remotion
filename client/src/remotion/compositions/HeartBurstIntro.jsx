import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Star = ({ angle, targetDistance, color, size, delay, frame, fps }) => {
  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const distance = interpolate(
    frame - delay,
    [0, 45],
    [0, targetDistance],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fade = interpolate(frame - delay, [0, 14, 50, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rad = (angle * Math.PI) / 180;
  const x = 50 + Math.cos(rad) * distance;
  const y = 50 + Math.sin(rad) * distance;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${appear})`,
        opacity: fade,
        color,
        fontSize: size,
        textShadow: `0 0 ${size * 0.6}px ${color}`,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      ★
    </div>
  );
};

const STARS = [
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `outer-${i}`,
    angle: i * 45 - 90,
    color: "#d4a853",
    size: 42,
    targetDistance: 34,
    delay: 10,
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `inner-${i}`,
    angle: i * 90 - 67.5,
    color: "#f5e6c8",
    size: 26,
    targetDistance: 20,
    delay: 16,
  })),
];

export const HeartBurstIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const titleFade = interpolate(frame, [4, 18, 65, 88], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowFade = interpolate(frame, [0, 22, 65, 88], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center, rgba(212,168,83,${
          0.32 * glowFade
        }) 0%, rgba(74,42,0,${0.15 * glowFade}) 55%, rgba(0,0,0,0) 100%)`,
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
            textShadow:
              "0 0 30px rgba(212, 168, 83, 0.9), 0 0 60px rgba(212, 168, 83, 0.35)",
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
