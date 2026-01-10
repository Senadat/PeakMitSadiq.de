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
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 px-10 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl ">
          <h1
            style={{
              fontSize: "9vw",
            }}
            className="
            font-bold text-center lg:text-left tracking-tight text-primary 
            leading-[0.95] flex-1 text-nowrap
          "
          >
            Erreiche
            <br />
            Mit Mir <br />
            Dein Peak
          </h1>

          <AnimatePresence mode="wait">
            {!hasCompletedForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className=" max-w-xl lg:w-1/2 "
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
    </div>
  );
}
