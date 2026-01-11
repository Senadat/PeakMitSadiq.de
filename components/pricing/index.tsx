import { PricingPlan } from "@/types/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../heading";
import PricingSection from "./ui/section";
import { gymOptions, homeOptions, personalOptions } from "@/lib/data/pricing";
import { useApp } from "@/context";
import Link from "next/link";
import Modal from "../modal";
import BookingPayment from "./ui/paymentModal";
import BookingConfirmation from "./ui/success";

export default function Pricing() {
  const [tab, setTab] = useState<PricingPlan>("home");
  const { openPricingModal, setOpenPricingModal, showSuccess } = useApp();

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
      title: "Einzeltraining",
    },
  ];

  function changeTab(t: PricingPlan) {
    setTab(t);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      id="pricing"
      className="p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants}>
        <SectionHeading>
          Dein Weg zum <br />
          PEAK
        </SectionHeading>
      </motion.div>

      <motion.p
        style={{
          fontSize: "clamp(18px, 2vw, 36px)",
        }}
        variants={itemVariants}
        className="
        text-gray2 max-w-2xl mx-auto
    text-center
    mb-4 sm:mb-5 md:mb-6
  
  "
      >
        Finde das Paket, das dich stärker, beweglicher oder fitter macht.
        <br />
        Individuell abgestimmt.
      </motion.p>

      {/* tabs */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-center gap-6 mb-10"
      >
        <div className="cursor-pointer divide-x divide-gray-300 rounded-lg text-sm text-[#252525] flex items-center w-fit mx-auto overflow-hidden shadow-md">
          {tabOptions.map((opt, index) => (
            <motion.div
              key={opt.tab}
              onClick={() => changeTab(opt.tab as PricingPlan)}
              className={`${
                tab === opt.tab ? "bg-primary text-white" : "bg-[#C4C4C4]"
              } px-6 sm:px-10 py-4 relative overflow-hidden text-[18px] md:text-[20px] xl:text-[24px] transition-colors duration-300`}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="relative z-10 truncate">{opt.title}</span>
              {tab === opt.tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.p
              key="home-notice"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className=" text-[18px] md:text-[20px] xl:text-[24px] text-gray2 text-center"
            >
              *Hausbesuche sind nur im Umkreis von 30 km um Iserlohn möglich.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mb-30"
        >
          {tab === "home" && (
            <PricingSection
              title="Die Sitzungen dauern 1 Stunde, Anfahrtszeit beträgt 40 Minuten."
              options={homeOptions}
            />
          )}
          {tab === "gym" && (
            <PricingSection
              title="Die Sitzungen dauern 1 Stunde."
              options={gymOptions}
            />
          )}
          {tab === "personal" && (
            <PricingSection
              title={`Für die mobilen Einheiten dauert die Anfahrtszeit 40 Minuten (Hin- und Rückfahrt).`}
              options={personalOptions}
              showCenter={false}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row gap-3 xl:gap-6 items-center justify-center text-white mt-12 md:mt-16"
      >
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Heute die Reise zum Peak beginnen?
        </motion.p>

        <motion.button
          onClick={() => setOpenPricingModal(true)}
          className="px-8 py-3 bg-primary  w-fit rounded-lg text-[20px] md:text-[22px] xl:text-[26px] font-medium text-lg shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Lass uns loslegen
        </motion.button>

        <motion.p
          className="text-center md:text-left text-[20px] md:text-[22px] xl:text-[26px]"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Nicht jetzt?{" "}
          <Link
            href="#contact"
            className="text-primary  hover:underline underline-offset-2 transition-all"
          >
            Kontaktiere mich
          </Link>
          .
        </motion.p>
      </motion.div>

      <Modal
        showCloseButton
        isOpen={openPricingModal}
        onClose={() => setOpenPricingModal(false)}
      >
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <BookingConfirmation />
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <BookingPayment />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </motion.section>
  );
}
