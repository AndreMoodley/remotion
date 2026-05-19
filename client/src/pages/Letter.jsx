import React, { useState, useEffect } from "react";
import "../assets/css/letter.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@remotion/player";
import { useEmailData } from "../components";
import config from "../config/config";
import songFile from "../assets/song.mp3";
import HeartBurstIntro from "../remotion/compositions/HeartBurstIntro";

function Letter() {
  const { emailData } = useEmailData();
  const navigate = useNavigate();

  const { buttons, api, customMessage } = config.letterPage;
  const [text] = useState(customMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    config.letterPage.placeholder.default
  );
  const [showOpening, setShowOpening] = useState(true);

  useEffect(() => {
    const audio = new Audio(songFile);
    audio.volume = 0.5;
    audio.loop = true;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Auto-play was prevented:", error);
      });
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    updateDate();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowOpening(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const updateDate = () => {
    const date = new Date();
    const dateNum = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const monthNum =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const yearNum = date.getFullYear();
    document.documentElement.style.setProperty(
      "--date",
      `'${dateNum}/${monthNum}/${yearNum}'`
    );
  };

  const sendEmail = async () => {
    if (text.trim()) {
      setIsLoading(true);
      setPlaceholder(buttons.loading);
      try {
        const response = await fetch(`${api.baseURL}${api.sendEmailEndpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            score: `Score: ${emailData.score} out of ${emailData.totalQuestions}`,
            drawings: emailData.drawings,
          }),
        });
        if (response.ok) {
          setPlaceholder(config.letterPage.placeholder.success);
          setTimeout(() => navigate("/closing"), 2000);
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setPlaceholder(config.letterPage.placeholder.error);
        setTimeout(() => {
          setPlaceholder(config.letterPage.placeholder.default);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      className="letter-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {showOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 pointer-events-none"
          >
            <Player
              component={HeartBurstIntro}
              durationInFrames={60}
              fps={30}
              compositionWidth={1080}
              compositionHeight={1920}
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop={false}
              controls={false}
              initiallyMuted
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="content" id="content">
        <div id="entry" className="letter-text">
          {text}
        </div>
      </div>

      <button
        className="mt-8 px-8 py-3 bg-pink-400 text-white rounded-full font-bold shadow-lg hover:bg-pink-500 transition-colors z-50"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </motion.div>
  );
}

export default Letter;
