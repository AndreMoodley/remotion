import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const EnvelopeOpen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flap = interpolate(frame, [0, 35], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const letterY = interpolate(frame, [30, 70], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heartPop = spring({
    frame: frame - 60,
    fps,
    config: { damping: 8, stiffness: 120 },
  });
  const heartFloat = interpolate(frame - 60, [0, 60], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heartFade = interpolate(frame - 60, [0, 30, 60], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sparkle = interpolate(frame, [0, 120], [0, 360]);

  const envelopeW = 320;
  const envelopeH = 230;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: envelopeW,
          height: envelopeH,
        }}
      >
        {/* Letter peeking out */}
        <div
          style={{
            position: "absolute",
            left: "8%",
            right: "8%",
            top: "15%",
            bottom: "0",
            background: "linear-gradient(180deg, #fff8f8 0%, #ffe9ef 100%)",
            borderRadius: "6px 6px 2px 2px",
            transform: `translateY(${letterY}px)`,
            boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
            zIndex: 1,
            padding: "20px 20px 0 20px",
            color: "#cf6b87",
            fontFamily: "cursive",
            fontSize: "1.05rem",
            lineHeight: 1.35,
            textAlign: "center",
          }}
        >
          ♥ I love you ♥
        </div>

        {/* Envelope body */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg,#ffd0db 0%, #ff9eb3 100%)",
            borderRadius: "8px",
            boxShadow:
              "0 14px 40px rgba(207,107,135,0.45), inset 0 -3px 0 rgba(0,0,0,0.08)",
            zIndex: 2,
          }}
        />

        {/* Envelope front triangle (notch) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: "55%",
            background:
              "linear-gradient(180deg, rgba(255,158,179,0) 0%, rgba(207,107,135,0.6) 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            zIndex: 3,
          }}
        />

        {/* Envelope flap (animates rotate around top edge) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: envelopeW,
            height: envelopeH * 0.65,
            background: "linear-gradient(180deg, #ffb6c8 0%, #ff8fa3 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top center",
            transform: `rotateX(${flap}deg)`,
            zIndex: 4,
            backfaceVisibility: "hidden",
          }}
        />

        {/* Heart pop */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: `translate(-50%, ${heartFloat}px) scale(${heartPop})`,
            opacity: heartFade,
            zIndex: 5,
          }}
        >
          <svg width={64} height={64} viewBox="0 0 24 24" fill="#e85d75">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Sparkles */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const sFrame = frame - 50;
          const sAppear = sFrame > 0 ? Math.min(1, sFrame / 20) : 0;
          const dist = interpolate(sFrame, [0, 40], [0, 130], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const sFade = interpolate(sFrame, [0, 20, 50], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rad = ((angle + sparkle) * Math.PI) / 180;
          const dx = Math.cos(rad) * dist;
          const dy = Math.sin(rad) * dist;
          return (
            <div
              key={angle}
              style={{
                position: "absolute",
                left: "50%",
                top: "40%",
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${sAppear})`,
                opacity: sFade,
                zIndex: 6,
                color: "#fff",
                fontSize: 24,
                textShadow: "0 0 12px #fff",
              }}
            >
              ✦
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default EnvelopeOpen;
