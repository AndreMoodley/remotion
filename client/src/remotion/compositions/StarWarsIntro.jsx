import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

const SW_YELLOW = "#FFE81F";

const Starfield = ({ count = 80 }) => {
  const stars = useMemo(() => {
    const out = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      out.push({
        left: rand() * 100,
        top: rand() * 100,
        size: 1 + rand() * 2,
        opacity: 0.4 + rand() * 0.6,
      });
    }
    return out;
  }, [count]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "#fff",
            borderRadius: "50%",
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.6)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const StarWarsIntro = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Phase 1: title "to my wifeeyyyy" (frames 0-90)
  const titleOpacity = interpolate(
    frame,
    [0, 18, 70, 90],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const titleScale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: perspective crawl (frames 90-300)
  const crawlStart = 90;
  const crawlProgress = interpolate(
    frame,
    [crawlStart, 300],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const crawlTranslateY = interpolate(crawlProgress, [0, 1], [height, -height * 1.4]);
  const crawlOpacity = interpolate(
    frame,
    [crawlStart, crawlStart + 20, 280, 300],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Starfield count={120} />

      {/* Phase 1: title */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            transform: `scale(${titleScale})`,
            color: SW_YELLOW,
            fontSize: "8rem",
            fontWeight: 900,
            letterSpacing: "0.04em",
            textShadow: "0 0 40px rgba(255,232,31,0.55), 0 0 80px rgba(255,232,31,0.25)",
            textAlign: "center",
            fontFamily: "Impact, 'Arial Black', sans-serif",
          }}
        >
          to my wifeeyyyy
        </div>
      </AbsoluteFill>

      {/* Phase 2: perspective crawl */}
      <AbsoluteFill
        style={{
          perspective: `${width * 0.6}px`,
          perspectiveOrigin: "50% 0%",
          opacity: crawlOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            transform: `rotateX(28deg) translateY(${crawlTranslateY}px)`,
            transformOrigin: "50% 0%",
            color: SW_YELLOW,
            fontSize: "5.5rem",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: 1.3,
            textAlign: "center",
            padding: "0 8%",
            fontFamily: "Impact, 'Arial Black', sans-serif",
            textShadow: "0 0 28px rgba(255,232,31,0.45)",
          }}
        >
          <div>I WUV YOU</div>
          <div>SHO SHO</div>
          <div>SHOOOOOOO</div>
          <div>SHOOOOOOOOOOOOO</div>
          <div>MUCHHH</div>
          <div>MI AMOR,</div>
          <br />
          <div>TYSM FOR</div>
          <div>BEING MINE</div>
          <div>FOR 1</div>
          <div>WHOLE YEAR</div>
        </div>

        {/* Vanishing point fade — darkens text as it recedes upward */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.85) 18%, rgba(0,0,0,0) 45%)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default StarWarsIntro;
