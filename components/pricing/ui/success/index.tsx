"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/context";

export default function BookingConfirmation() {
  const { setOpenPricingModal } = useApp();

  const instructions = [
    "Datum der ersten Einheit festlegen",
    "In person für dein Paket bezahlen",
    "Dein Peak erreichen",
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-8  px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center gap-8 lg:gap-12 max-w-3xl mx-auto"
    >
      {/* success tick */}
      <motion.div
        variants={itemVariants}
        className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
      >
        <Image
          src="/success-tick.svg"
          alt="Success Logo"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-center gap-3 lg:gap-4"
      >
        <h4 className="text-center text-primary text-lg md:text-xl lg:text-3xl font-semibold">
          Glückwunsch
          <br /> die Reise zu deinem Peak startet ab jetzt!
        </h4>
        <p className="text-center text-white text-sm md:text-base">
          Ich wurde benachrichtigt und melde mich sehr bald bei dir.
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-4 md:gap-6 px-4 text-white w-full"
      >
        <p className="font-medium text-primary text-pretty text-base md:text-lg">
          Die nächsten Schritte
        </p>
        <ul className="flex flex-col gap-4 md:gap-5 w-fit items-center">
          {instructions.map((inst, i) => (
            <motion.li
              key={`instruct-${i}`}
              variants={itemVariants}
              className="flex w-full items-center gap-3 md:gap-4 text-sm md:text-base lg:text-lg"
            >
              <span className="rounded-full bg-primary text-white w-7 h-7 md:w-9 md:h-9 flex items-center justify-center font-medium">
                {i + 1}
              </span>
              <span>{inst}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Close button */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-4 w-full"
      >
        <button
          onClick={() => setOpenPricingModal(false)}
          className="bg-primary text-white w-full max-w-87.5 hover:bg-primary/90 transition-colors duration-200 rounded-4xl text-lg md:text-xl flex items-center justify-center py-3 md:py-4 px-6 md:px-8"
        >
          Verstanden
        </button>
        <p className="text-sm text-center w-full mt-4 md:mt-6 text-white/70">
          © {new Date().getFullYear()} PeakMitSadiq. Alle Rechte vorbehalten.
        </p>
      </motion.div>
    </motion.div>
  );
}
