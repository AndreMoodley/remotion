import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

// Anniversary-site palette (matches the gold/sepia used throughout the app)
const GOLD = "#d4a853";
const GOLD_BRIGHT = "#f5c842";
const GOLD_SOFT = "#f5e6c8";

const Starfield = ({ count = 100 }) => {
  const stars = useMemo(() => {
    const out = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const isGold = rand() > 0.55;
      out.push({
        left: rand() * 100,
        top: rand() * 100,
        size: 1 + rand() * 2.2,
        opacity: 0.35 + rand() * 0.55,
        color: isGold ? GOLD_SOFT : "#ffffff",
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
            background: s.color,
            borderRadius: "50%",
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2.5}px ${s.color}`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const StarWarsIntro = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Total duration: 540 frames @ 30fps = 18s (was 10s — slowed down for readability)
  // Title phase: 0-150 (5s), Crawl phase: 150-540 (13s)
  const TITLE_END = 150;
  const CRAWL_START = 150;
  const CRAWL_END = 540;

  // Phase 1: title "to my wifeeyyyy"
  const titleOpacity = interpolate(
    frame,
    [0, 28, 110, 150],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const titleScale = interpolate(frame, [0, 50], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Subtle ambient glow under the title
  const glowOpacity = interpolate(frame, [0, 40, 110, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: perspective crawl
  const crawlProgress = interpolate(
    frame,
    [CRAWL_START, CRAWL_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  // Travel far enough to clear the entire stanza past the vanishing point
  const crawlTranslateY = interpolate(crawlProgress, [0, 1], [height, -height * 2.2]);
  const crawlOpacity = interpolate(
    frame,
    [CRAWL_START, CRAWL_START + 30, CRAWL_END - 30, CRAWL_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center, rgba(212,168,83,${
          0.18 * glowOpacity + 0.04
        }) 0%, rgba(74,42,0,0.18) 50%, #0d0d0d 100%)`,
        overflow: "hidden",
      }}
    >
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
            color: GOLD_BRIGHT,
            fontSize: "7.5rem",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textShadow: `0 0 36px rgba(212,168,83,0.85), 0 0 80px rgba(212,168,83,0.35)`,
            textAlign: "center",
          }}
        >
          to my wifeeyyyy
        </div>
      </AbsoluteFill>

      {/* Phase 2: perspective crawl */}
      <AbsoluteFill
        style={{
          perspective: `${width * 0.55}px`,
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
            color: GOLD,
            fontSize: "5rem",
            fontWeight: 800,
            letterSpacing: "0.03em",
            lineHeight: 1.35,
            textAlign: "center",
            padding: "0 8%",
            textShadow: `0 0 26px rgba(212,168,83,0.5)`,
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
          <div>WHOLE YEAR ♥</div>
        </div>

        {/* Fade toward the vanishing point so text dissolves into the gold glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, #0d0d0d 0%, rgba(13,13,13,0.85) 22%, rgba(13,13,13,0) 48%)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default StarWarsIntro;
