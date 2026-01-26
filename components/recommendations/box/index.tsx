import { useApp } from "@/context";
import { scrollToId } from "@/lib/utils/scrollToId";
import { motion } from "framer-motion";

type Props = {
  recommendedPackage?: string;
};

export default function RecommendationBox({
  recommendedPackage = "PeakPainFree Gym",
}: Props) {
  const {
    showRecommendationBox,
    setShowRecommendationBox,
    setHideRecommendationBox,
    hideRecommendationBox,
  } = useApp();

  if (!showRecommendationBox || hideRecommendationBox) return null;

  // ---- handlers ----
  const handleClose = () => {
    setHideRecommendationBox(true);
    setShowRecommendationBox(false);
  };

  const handleContactClick = () => {
    setHideRecommendationBox(true);
    setShowRecommendationBox(false);
    scrollToId("contact");
  };

  const handleBackToRecommendation = () => {
    scrollToId("recommendation");
  };

  return (
    <motion.div
      className="rounded-2xl fixed bottom-[5vh] right-[2vw] z-30 hidden lg:flex flex-col gap-4 lg:items-center px-6 py-8 bg-[#343434B2]"
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 30 }}
    >
      {/* Close icon */}
      <span
        onClick={handleClose}
        className="p-2 cursor-pointer text-xl rounded-full text-red-500 hover:bg-red-500/5 absolute right-1 top-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-6 h-6 fill-[#EA3323]"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </span>

      {/* Text */}
      <div className="text-xl text-white ">
        Aufgrund deiner Antworten empfehle ich dir dieses Paket: <br />
        <span className="text-primary text-[2vw]">
          {recommendedPackage}
        </span>{" "}
      </div>

      {/* Actions */}
      <div className="w-full flex gap-6 md:gap-10 items-center justify-center">
        <button
          onClick={handleContactClick}
          className="
            rounded-md
            text-lg
            bg-primary text-white
            py-2 px-6
            transition-all duration-300
            hover:scale-105 hover:shadow-lg
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-primary/40
             min-w-fit
          w-1/2
          max-w-75
          "
        >
          Kontaktiere mich
        </button>

        <button
          onClick={handleBackToRecommendation}
          className="
          min-w-fit
          w-1/2
          max-w-75
            rounded-md
            text-[clamp(14px,1.4vw,28px)]
            bg-transparent border-2 border-primary text-primary
            py-2 px-6
            transition-all duration-300
            hover:bg-primary hover:text-white hover:scale-105
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
        >
          Zurück zur Empfehlung
        </button>
      </div>
    </motion.div>
  );
}
