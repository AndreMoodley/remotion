import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const LyricalTextReveal = ({ sentences = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const perSentence = 24;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        textAlign: "center",
      }}
    >
      {sentences.map((sentence, i) => {
        const start = i * perSentence;
        const enter = spring({
          frame: frame - start,
          fps,
          config: { damping: 14, stiffness: 100 },
        });
        const slide = interpolate(frame - start, [0, 20], [40, 0], {
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(frame - start, [0, 18], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              transform: `translateY(${slide}px) scale(${enter})`,
              opacity,
              color: "white",
              fontSize: "1.85rem",
              fontWeight: 800,
              textShadow: "0 4px 18px rgba(0,0,0,0.4)",
              marginBottom: "0.4em",
              lineHeight: 1.2,
            }}
          >
            {sentence}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default LyricalTextReveal;
