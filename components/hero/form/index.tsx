"use client";

import { useApp } from "@/context";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import Steps from "./ui/steps";
import SectionA from "./ui/sections/sectionA";
import SectionB from "./ui/sections/sectionB";
import SectionC from "./ui/sections/sectionC";
import SectionD from "./ui/sections/sectionD";
import SectionE from "./ui/sections/sectionE";

export default function HeroForm() {
  const { currentFormIndex, sendingEmail } = useApp();

  // Memoize sections to prevent recreating on every render
  const formSections = useMemo(
    () => [
      <SectionA key="section-a-form" />,
      <SectionB key="section-b-form" />,
      <SectionC key="section-c-form" />,
      <SectionD key="section-d-form" />,
      <SectionE key="section-e-form" />,
    ],
    [],
  );

  return (
    <div className="flex flex-col flex-none w-full gap-4 justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFormIndex}
          initial={{ opacity: 0, x: 20 }} // Reduced from 40
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} // Reduced from -40
          transition={{
            duration: 0.2, // Reduced from 0.3
            ease: "easeOut",
          }}
          className="w-full text-gray2"
          style={{
            // Improve animation performance
            willChange: "transform, opacity",
          }}
        >
          {formSections[currentFormIndex]}
        </motion.div>
      </AnimatePresence>

      {!sendingEmail && <Steps length={formSections.length} />}
    </div>
  );
}
