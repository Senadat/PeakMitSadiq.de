import { PricingPlan } from "@/types/pricing";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../heading";
import { motion } from "framer-motion";
import PricingSection from "./ui/section";
import { gymOptions, homeOptions, personalOptions } from "@/lib/data/pricing";
import { useApp } from "@/context";

export default function pricingSection() {
  const [tab, setTab] = useState<PricingPlan>("home");
  const { setOpenPricingModal } = useApp();

  const tabOptions = [
    {
      tab: "home",
      title: "Heim",
    },
    {
      tab: "gym",
      title: "Im Gym",
    },
    {
      tab: "personal",
      title: "Heim",
    },
  ];

  function changeTab(t: PricingPlan) {
    setTab(t);
  }

  return (
    <section id={"pricing"} className="p-8">
      <SectionHeading>Dein Weg zum PEAK</SectionHeading>
      <p className="text-center pb-6 text-gray2">
        Finde das Paket, das dich stärker, beweglicher oder fitter macht.
        Individuell abgestimmt.
      </p>

      {/* tabs */}
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        <motion.div className="cursor-pointer divide-x divide-gray-300 rounded-lg text-sm text-[#252525] flex items-center w-fit mx-auto transition-all">
          {tabOptions.map((opt) => (
            <div
              onClick={() => changeTab(opt.tab as PricingPlan)}
              className={`${
                tab === opt.tab ? "bg-primary" : "bg-[#C4C4C4]"
              } hover:bg-primary px-10 py-4`}
            >
              {opt.title}
            </div>
          ))}
        </motion.div>

        {tab === "home" && (
          <p className="text-xs text-gray2">
            *Hausbesuche sind nur im Umkreis von 30 km um Iserlohn möglich.
          </p>
        )}
      </div>

      <AnimatePresence>
        <motion.div>
          <>{tab === "home" && <PricingSection options={homeOptions} />}</>
          <>{tab === "gym" && <PricingSection options={gymOptions} />}</>
          <>
            {tab === "personal" && <PricingSection options={personalOptions} />}
          </>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-white">
        <p className=""></p>
        <button
          onClick={() => setOpenPricingModal(true)}
          className="p-2 bg-primary"
        >
          Lass uns loslegen
        </button>
        <p className=""></p>
      </div>
    </section>
  );
}
