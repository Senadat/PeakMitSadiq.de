"use client";

import { useApp } from "@/context";
import { AnimatePresence, motion } from "framer-motion";
import Steps from "./ui/steps";
import SectionA from "./ui/sections/sectionA";
import SectionB from "./ui/sections/sectionB";
import SectionC from "./ui/sections/sectionC";
import SectionD from "./ui/sections/sectionD";

export default function HeroForm() {
  const { currentFormIndex } = useApp();

  const formSections = [
    <SectionA key="section-a" />,
    <SectionB key="section-b" />,
    <SectionC key="section-c" />,
    <SectionD key="section-d" />,
  ];

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFormIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full text-gray2"
        >
          {formSections[currentFormIndex]}
        </motion.div>
      </AnimatePresence>

      <Steps />
    </div>
  );
}
