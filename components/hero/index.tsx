"use client";

import { useApp } from "@/context";
import HeroForm from "./form";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const { currentHeroImage, hasCompletedForm } = useApp();

  return (
    <div className="w-full min-h-screen relative overflow-hidden md:py-10 lg:py-20">
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
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1
          className="
            font-extrabold tracking-tight text-primary
            leading-[0.95]

            text-[48px]
            sm:text-[64px]
            md:text-[96px]
            lg:text-[128px]
            xl:text-[160px]
            2xl:text-[180px]
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
