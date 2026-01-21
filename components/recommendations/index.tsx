import { useApp } from "@/context";
import { createRecommendation } from "@/lib/utils/createRecommendation";
import RecommendationContent from "./content";
// import { useEffect } from "react";
import { scrollToId } from "@/lib/utils/scrollToId";
import { AnimatePresence, motion } from "framer-motion";
import RecommendationBox from "./box";

export default function Recommendations() {
  const {
    formData,
    showRecommendation,
    showRecommendationBox,
    setShowRecommendation,
    setShowRecommendationBox,
  } = useApp();
  const recommendation = createRecommendation(formData);

  if (!showRecommendation) {
    return null;
  }

  const handleViewPackage = () => {
    scrollToId("pricing");
  };

  const handleReadLater = () => {
    setShowRecommendation(false);
    setShowRecommendationBox(true);
  };

  // useEffect(() => {
  //   const onScroll = () => {
  //     const el = document.getElementById("recommendation");
  //     if (!el) return;

  //     const rect = el.getBoundingClientRect();
  //     if (rect.bottom < 100) {
  //       setShowRecommendation(false);
  //       setShowRecommendationBox(true);
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <AnimatePresence>
      {showRecommendation && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          layout
          className="w-full space-y-10 px-4"
        >
          {/* header */}
          <h2 className="text-[6vw] text-primary font-semibold text-center mb-4">
            Danke für dein Vertrauen.
          </h2>
          {/* content */}
          {recommendation ? (
            <>
              <RecommendationContent data={recommendation} />
              {/* action buttons */}
              <div className="w-full flex gap-6 md:gap-10 sm:flex-row items-center justify-center">
                <button
                  onClick={handleViewPackage}
                  className="
      rounded-md
      text-[clamp(18px,2vw,36px)]
      bg-primary text-white
      py-2 px-6
      transition-all duration-300 ease-out
      hover:scale-105 hover:shadow-lg
      active:scale-95
      focus:outline-none focus:ring-2 focus:ring-primary/40
    "
                >
                  Paket ansehen
                </button>

                <button
                  onClick={handleReadLater}
                  className="
      rounded-md
      text-[clamp(18px,2vw,36px)]
      bg-transparent border-2 border-primary text-primary
      py-2 px-6
      transition-all duration-300 ease-out
      hover:bg-primary hover:text-white hover:scale-105
      active:scale-95
      focus:outline-none focus:ring-2 focus:ring-primary/40
    "
                >
                  Später durchlesen
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-10 md:p-20 text-[clamp(18px,2vw,36px)]">
                Etwas ist schiefgelaufen. Wir konnten deine Empfehlung nicht
                laden. Bitte versuche es erneut.
              </div>
            </>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
