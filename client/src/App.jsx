import { Routes, Route } from "react-router-dom";
import "./index.css";
import HeartsBackground from "./components/HeartsBackground";
import RouteTransition from "./components/RouteTransition";
import {
  Home,
  Memories,
  Valentines,
  Quiz,
  Letter,
  Drawing,
  Closing,
} from "./pages";

function App() {
  return (
    <>
      <HeartsBackground />
      <RouteTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Valentines" element={<Valentines />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/drawing" element={<Drawing />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/closing" element={<Closing />} />
        </Routes>
      </RouteTransition>
    </>
  );
}

export default App;
