import { useApp } from "@/context";
import { b } from "framer-motion/m";

export default function Steps({ length }: { length: number }) {
  const { currentFormIndex, setCurrentFormIndex, setCurrentHeroImage } =
    useApp();
  const backgroundImages = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
  ];

  const handleClick = (value: number) => {
    if (value > currentFormIndex) {
      // const formattedForm = Object.values(formData);
      return;
    }

    if (value < backgroundImages.length - 1) {
      setCurrentHeroImage(backgroundImages[value]);
    }

    setCurrentFormIndex(value);
  };

  return (
    <div className={`flex items-center gap-3`}>
      {Array.from({ length }, (_, i) => (
        <span
          onClick={() => handleClick(i)}
          key={`step-${i}`}
          className={`cursor-pointer rounded-full w-4 h-4 ${
            currentFormIndex >= i ? "bg-primary" : "bg-white/10"
          }`}
        ></span>
      ))}
    </div>
  );
}
