import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Player } from "@remotion/player";
import PageTransition from "../remotion/compositions/PageTransition";

// Plays a Remotion wipe overlay whenever the route path changes.
function RouteTransition({ children, durationMs = 700 }) {
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), durationMs);
    return () => clearTimeout(t);
  }, [location.pathname, durationMs]);

  return (
    <>
      {children}
      {playing && (
        <div className="fixed inset-0 z-[55] pointer-events-none">
          <Player
            component={PageTransition}
            durationInFrames={Math.floor((durationMs / 1000) * 30)}
            fps={30}
            compositionWidth={1080}
            compositionHeight={1920}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
            controls={false}
            initiallyMuted
          />
        </div>
      )}
    </>
  );
}

export default RouteTransition;
