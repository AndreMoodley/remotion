import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  interpolate,
  Audio,
} from "remotion";

const PHOTO_FRAMES = 150; // 5s at 30fps
const FADE_FRAMES = 18;

const Slide = ({ src, caption, index }) => {
  const frame = useCurrentFrame();
  const localFrame = frame;

  // Ken-Burns zoom + drift
  const zoom = interpolate(localFrame, [0, PHOTO_FRAMES], [1, 1.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xDrift = interpolate(localFrame, [0, PHOTO_FRAMES], [
    index % 2 === 0 ? -2 : 2,
    index % 2 === 0 ? 2 : -2,
  ]);
  const yDrift = interpolate(localFrame, [0, PHOTO_FRAMES], [
    index % 3 === 0 ? -1.5 : 1.5,
    index % 3 === 0 ? 1.5 : -1.5,
  ]);

  // Fade in/out
  const fadeIn = interpolate(localFrame, [0, FADE_FRAMES], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    localFrame,
    [PHOTO_FRAMES - FADE_FRAMES, PHOTO_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // Caption rise
  const captionY = interpolate(localFrame, [20, 50], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(
    localFrame,
    [20, 50, PHOTO_FRAMES - FADE_FRAMES, PHOTO_FRAMES],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{
          transform: `scale(${zoom}) translate(${xDrift}%, ${yDrift}%)`,
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Caption */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "60px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `translateY(${captionY}px)`,
            opacity: captionOpacity,
            color: "white",
            fontSize: "2.2rem",
            fontWeight: 800,
            textShadow: "0 4px 18px rgba(0,0,0,0.7)",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          {caption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const KenBurnsSlideshow = ({ photos = [], song }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0010" }}>
      {song ? <Audio src={song} volume={0.55} /> : null}
      {photos.map((photo, i) => (
        <Sequence
          key={photo.id ?? i}
          from={i * (PHOTO_FRAMES - FADE_FRAMES)}
          durationInFrames={PHOTO_FRAMES}
        >
          <Slide src={photo.src} caption={photo.caption} index={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

KenBurnsSlideshow.computeDuration = (photoCount) =>
  Math.max(60, photoCount * (PHOTO_FRAMES - FADE_FRAMES) + FADE_FRAMES);

export default KenBurnsSlideshow;
