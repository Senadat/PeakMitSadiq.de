"use client";

import { useApp } from "@/context";
import HeroForm from "./form";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const { currentHeroImage } = useApp();
  console.log(currentHeroImage);

  return (
    <section
      id="section_1"
      className="w-full h-screen relative overflow-hidden"
    >
      {/* Background images with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroImage} // important: triggers remount on change
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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
        <h1
          className="
            text-center font-extrabold tracking-tight
            text-3xl sm:text-4xl md:text-5xl
            lg:text-6xl xl:text-7xl 2xl:text-8xl
            text-primary
          "
        >
          Erreiche Mit
          <br /> Mir Dein Peak
        </h1>

        <HeroForm />
      </div>
    </section>
  );
}
