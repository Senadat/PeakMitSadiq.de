"use client";

import { useApp } from "@/context";
import { PricingCardType } from "@/types/pricing";
import { motion } from "framer-motion";

export default function PricingCard({
  pricing,
  isCenter = false,
}: {
  pricing: PricingCardType;
  isCenter?: boolean;
}) {
  const { setOpenPricingModal, setSelectedPricing, selectedPricing } = useApp();

  function handleClick() {
    setSelectedPricing(pricing);
    setOpenPricingModal(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -8,
        scale: isCenter ? 1.06 : 1.03,
      }}
      className={`flex flex-col items-center gap-4 rounded-xl max-w-90 py-4 px-6 md:py-6 md:px-8 transition-colors ${
        pricing.id === selectedPricing?.id
          ? "border border-primary ring-2 ring-primary/40"
          : ""
      } ${
        isCenter
          ? " bg-[#EBEBEB] text-black shadow-xl"
          : "bg-[#EBEBEB33] text-[#EBEBEB]"
      }`}
    >
      <p className="whitespace-pre-line  text-[18px] md:text-[20px] xl:text-[24px] text-primary text-center">
        {pricing.package}
      </p>

      <motion.p
        className="font-bold text-[clamp(2rem,8vw,64px)]"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        {pricing.price}€
      </motion.p>

      <hr className="w-[50%] bg-[#FFFFFF80] h-0.5" />

      <ul className="flex flex-col gap-1 md:text-lg lg:text-xl">
        {pricing.features.map((f, i) => (
          <motion.li
            key={f}
            className=" list-disc"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            {f}
          </motion.li>
        ))}
      </ul>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer truncate w-full text-[20px] md:text-[22px] xl:text-[26px] max-w-[75%] bg-primary text-white px-4 py-2 rounded-md"
      >
        Jetzt starten!
      </motion.button>
    </motion.div>
  );
}
