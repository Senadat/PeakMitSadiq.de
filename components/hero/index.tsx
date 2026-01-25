"use client";

import { useApp } from "@/context";
import HeroForm from "./form";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { scrollToId } from "@/lib/utils/scrollToId";

export default function Hero() {
  const {
    currentHeroImage,
    hasCompletedForm,
    showRecommendation,
    scrollToRecommendation,
    setScrollToRecommendation,
  } = useApp();
  const isEmailCollected = hasCompletedForm && showRecommendation;

  useEffect(() => {
    if (isEmailCollected) {
      if (!scrollToRecommendation) {
        scrollToId("recommendation");
        setScrollToRecommendation(true);
      }
    }
  }, [isEmailCollected]);

  return (
    <div
      id="hero"
      // style={{
      //   opacity: showRecommendation ? 0.2 : 1,
      //   transition: "opacity 300ms ease",
      // }}

      className="w-full min-h-screen relative overflow-hidden "
    >
      {/* Background images with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroImage}
          className="absolute inset-0 bg-cover bg-center bg-fill"
          style={{ backgroundImage: `url(${currentHeroImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      {isEmailCollected ? (
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-8 px-[clamp(16px,1%,24px)]">
          <h1
            style={{
              fontSize: "8vw",
            }}
            className="
            font-bold text-center tracking-tight text-primary 
            leading-[0.95] 
          "
          >
            Meine erste Trainingsempfehlung für dich
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray2 text-center">
            Basierend auf dem, was du mir bisher über dich erzählt hast.
          </p>
        </div>
      ) : (
        <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 py-10 px-10 lg:px-20 text-center">
          <div className="flex flex-col lg:flex-row items-center  justify-center lg:justify-between gap-8 w-full">
            <h1
              style={{
                fontSize: "8.5vw",
              }}
              className="
            font-bold flex-none text-center lg:text-left tracking-tight text-primary 
            leading-[0.95] lg:w-[calc(50%-16px)]
          "
            >
              Erreiche Mit Mir
              <br /> Deinen Peak
            </h1>

            <AnimatePresence mode="wait">
              {!hasCompletedForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="lg:w-[calc(50%-16px)] flex items-center justify-center flex-none w-[90%] "
                >
                  <HeroForm />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-xl"
                >
                  <p className="text-xl md:text-2xl font-semibold text-white">
                    Danke für dein Vertrauen 💪
                  </p>
                  <p className="mt-2 text-white/80">
                    Ich habe deine Angaben erhalten und melde mich zeitnah bei
                    dir. Gemeinsam bringen wir dich auf dein nächstes Level.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
