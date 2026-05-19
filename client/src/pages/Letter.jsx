import React, { useState, useEffect, useMemo } from "react";
import "../assets/css/letter.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@remotion/player";
import { useEmailData } from "../components";
import config from "../config/config";
import songFile from "../assets/song.mp3";
import HeartBurstIntro from "../remotion/compositions/HeartBurstIntro";
import AnniversaryBackground from "../components/HeartsBackground";

function Letter() {
  const { emailData } = useEmailData();
  const navigate = useNavigate();

  const { buttons, api, customMessage } = config.letterPage;
  const [text] = useState(customMessage);
  const [, setIsLoading] = useState(false);
  const [, setPlaceholder] = useState(config.letterPage.placeholder.default);
  const [showOpening, setShowOpening] = useState(true);

  useEffect(() => {
    const audio = new Audio(songFile);
    audio.volume = 0.5;
    audio.loop = true;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowOpening(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const formattedDate = useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd} · ${mm} · ${d.getFullYear()}`;
  }, []);

  // Parse the letter into salutation + body paragraphs + signature
  const { salutation, bodyParagraphs, signatureLines } = useMemo(() => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const sal = paragraphs[0] ?? "";
    const sig = paragraphs[paragraphs.length - 1] ?? "";
    const body = paragraphs.slice(1, -1);
    const sigLines = sig.split("\n").map((l) => l.trim()).filter(Boolean);
    return { salutation: sal, bodyParagraphs: body, signatureLines: sigLines };
  }, [text]);

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
  void sendEmail;

  const paragraphBaseDelay = 2.3;
  const paragraphStagger = 0.18;
  const signatureDelay =
    paragraphBaseDelay + bodyParagraphs.length * paragraphStagger + 0.4;
  const ornamentDelay = signatureDelay + 0.6;
  const buttonDelay = signatureDelay + 1.2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[100dvh] w-full overflow-x-hidden"
    >
      <AnniversaryBackground />

      {/* Soft gold halo glow behind the card */}
      <div
        aria-hidden
        className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10"
      >
        <div
          className="w-[90%] max-w-3xl aspect-square rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,83,0.32) 0%, rgba(245,200,66,0.10) 38%, transparent 72%)",
          }}
        />
      </div>

      {/* Entrance star burst */}
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

      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-start px-4 py-14 sm:py-20">
        <motion.article
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 1.6 }}
          className="relative w-full max-w-2xl mx-auto rounded-sm px-7 sm:px-12 py-12 sm:py-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(40,30,15,0.55) 0%, rgba(20,15,5,0.78) 100%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(212,168,83,0.32)",
            boxShadow:
              "0 0 60px rgba(212,168,83,0.18), 0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(245,230,200,0.05)",
          }}
        >
          {/* Corner tick marks */}
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#d4a853]/40" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#d4a853]/40" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#d4a853]/40" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#d4a853]/40" />

          {/* "ONE YEAR ✦" header */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4a853]/60" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#d4a853]/80 uppercase">
              One Year ✦
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4a853]/60" />
          </motion.div>

          {/* Date stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.95, duration: 0.6 }}
            className="absolute top-7 right-7 sm:top-9 sm:right-12 text-[9px] font-mono tracking-[0.25em] text-[#d4a853]/55 border-y border-[#d4a853]/30 py-1 px-2"
          >
            {formattedDate}
          </motion.div>

          {/* Salutation */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="text-center italic mt-6 mb-10"
            style={{
              fontFamily:
                '"Cormorant Garamond", "Iowan Old Style", "Palatino", serif',
              fontSize: "1.75rem",
              color: "#f5e6c8",
              textShadow: "0 0 16px rgba(245,230,200,0.22)",
            }}
          >
            {salutation}
          </motion.h2>

          {/* Body paragraphs */}
          <div className="letter-body text-base sm:text-lg">
            {bodyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: paragraphBaseDelay + i * paragraphStagger,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                style={{ overflow: "hidden" }}
              >
                {i === 0 ? (
                  <>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: paragraphBaseDelay + 0.1,
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                      className="drop-cap"
                    >
                      {para.charAt(0)}
                    </motion.span>
                    {para.slice(1)}
                  </>
                ) : (
                  para
                )}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: signatureDelay, duration: 1 }}
            className="mt-14 text-right"
          >
            {signatureLines.length > 1 && (
              <p
                className="italic text-[#d4a853]/85 text-lg mb-1"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {signatureLines[0]}
              </p>
            )}
            <p className="signature">
              {signatureLines[signatureLines.length - 1]}
            </p>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ornamentDelay, duration: 0.8 }}
            className="mt-12 flex items-center justify-center gap-3 text-[#d4a853]/55"
          >
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4a853]/55" />
            <span
              className="text-2xl"
              style={{
                filter: "drop-shadow(0 0 10px rgba(212,168,83,0.55))",
              }}
            >
              ✦
            </span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4a853]/55" />
          </motion.div>
        </motion.article>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: buttonDelay, duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/")}
          className="mt-12 px-6 py-2.5 bg-[#1a1a1a]/70 backdrop-blur-sm text-[#d4a853] border border-[#d4a853]/45 rounded-full font-medium text-sm tracking-wider hover:border-[#d4a853] hover:bg-[#1a1a1a] transition-colors"
          style={{ boxShadow: "0 0 24px rgba(212,168,83,0.18)" }}
        >
          ← Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Letter;
