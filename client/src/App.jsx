import { Routes, Route } from "react-router-dom";
import "./index.css";
import AnniversaryBackground from "./components/HeartsBackground";
import RouteTransition from "./components/RouteTransition";
import {
  Home,
  Memories,
  Anniversary,
  PhotoGallery,
  Quiz,
  Letter,
  Drawing,
  Closing,
} from "./pages";

function App() {
  return (
    <>
      <AnniversaryBackground />
      <RouteTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anniversary" element={<Anniversary />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/gallery" element={<PhotoGallery />} />
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
