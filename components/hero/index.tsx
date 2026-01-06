"use client";

import { useApp } from "@/context";
import HeroForm from "./form";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const { currentHeroImage, hasCompletedForm } = useApp();

  return (
    <div className="w-full min-h-screen relative overflow-hidden ">
      {/* Background images with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroImage}
          className="absolute inset-0 bg-cover bg-center"
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
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1
          style={{
            fontSize: "12vw",
          }}
          className="
            font-extrabold tracking-tight text-primary
            leading-[0.95]
          "
        >
          Erreiche Mit
          <br /> Mir Dein Peak
        </h1>

        <AnimatePresence mode="wait">
          {!hasCompletedForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
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
                Ich habe deine Angaben erhalten und melde mich zeitnah bei dir.
                Gemeinsam bringen wir dich auf dein nächstes Level.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
