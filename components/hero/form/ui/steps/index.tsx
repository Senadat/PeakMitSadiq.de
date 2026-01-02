import { useApp } from "@/context";

export default function Steps() {
  const { currentFormIndex, setCurrentFormIndex, setCurrentHeroImage } =
    useApp();
  const backgroundImages = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
  ];

  const handleClick = (value: number) => {
    setCurrentHeroImage(backgroundImages[value]);
    setCurrentFormIndex(value);
  };

  return (
    <div className={`flex items-center gap-3`}>
      {Array.from({ length: 4 }, (_, i) => (
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
