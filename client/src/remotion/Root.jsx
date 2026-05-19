import React from "react";
import { Composition } from "remotion";
import HeartBurstIntro from "./compositions/HeartBurstIntro";
import StarWarsIntro from "./compositions/StarWarsIntro";
import LyricalTextReveal from "./compositions/LyricalTextReveal";
import EnvelopeOpen from "./compositions/EnvelopeOpen";
import KenBurnsSlideshow from "./compositions/KenBurnsSlideshow";
import PageTransition from "./compositions/PageTransition";
import FireworkFinale from "./compositions/FireworkFinale";

// Registry for optional `remotion render` CLI use. Not required at runtime
// (the app uses <Player> directly inside React pages).
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HeartBurstIntro"
        component={HeartBurstIntro}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StarWarsIntro"
        component={StarWarsIntro}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LyricalTextReveal"
        component={LyricalTextReveal}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ sentences: ["Hola", "Mina More"] }}
      />
      <Composition
        id="EnvelopeOpen"
        component={EnvelopeOpen}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KenBurnsSlideshow"
        component={KenBurnsSlideshow}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ photos: [], song: undefined }}
      />
      <Composition
        id="PageTransition"
        component={PageTransition}
        durationInFrames={40}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FireworkFinale"
        component={FireworkFinale}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

export default RemotionRoot;
