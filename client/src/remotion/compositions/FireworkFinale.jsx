import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const Firework = ({ originX, originY, color, startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0 || local > 70) return null;

  const particles = 16;

  return (
    <>
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        const dist = interpolate(local, [0, 50], [0, 200], {
          extrapolateRight: "clamp",
        });
        const fade = interpolate(local, [0, 20, 60], [1, 1, 0], {
          extrapolateRight: "clamp",
        });
        const gravity = interpolate(local, [0, 70], [0, 60]);
        const x = originX + Math.cos(angle) * dist;
        const y = originY + Math.sin(angle) * dist + gravity;
        const size = interpolate(local, [0, 50], [6, 2], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${color}`,
              opacity: fade,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </>
  );
};

const FIREWORKS = [
  { startFrame: 0, originX: 25, originY: 30, color: "#ff6b9d" },
  { startFrame: 15, originX: 70, originY: 25, color: "#ffd6e0" },
  { startFrame: 30, originX: 50, originY: 40, color: "#ff8fa3" },
  { startFrame: 50, originX: 30, originY: 35, color: "#ffffff" },
  { startFrame: 65, originX: 75, originY: 45, color: "#ffaec8" },
  { startFrame: 85, originX: 50, originY: 30, color: "#e85d75" },
  { startFrame: 105, originX: 20, originY: 40, color: "#ffd6e0" },
  { startFrame: 125, originX: 80, originY: 35, color: "#ff8fa3" },
];

export const FireworkFinale = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const textOpacity = interpolate(frame, [60, 90, 180, 210], [0, 1, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame / 8) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(74,0,0,0.55) 100%)",
      }}
    >
      {FIREWORKS.map((fw, i) => (
        <Firework key={i} {...fw} />
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
            transform: `scale(${textScale * pulse})`,
            opacity: textOpacity,
            color: "white",
            fontSize: "3.4rem",
            fontWeight: 900,
            textShadow:
              "0 0 24px rgba(255,143,163,0.9), 0 4px 18px rgba(0,0,0,0.6)",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          I love you ♥
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default FireworkFinale;
