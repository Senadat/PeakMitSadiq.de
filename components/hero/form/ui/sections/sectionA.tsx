import { GoalType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionA() {
  const options: GoalType[] = [
    "Schmerzfrei & Gesund im Alltag",
    "Gewichtsabnahme",
    "Muskelaufbau",
  ];

  return (
    <div
      className="
        bg-transparent
        flex flex-col items-center
        gap-4 sm:gap-5 lg:gap-6
      "
    >
      {/* Heading */}
      <p
        style={{
          fontSize: "clamp(18px, 2vw, 40px)",
        }}
        className="
          font-semibold text-center lg:text-left
         
        "
      >
        Wobei kann ich dich unterstützen?
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-4
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="a" value={opt} />
        ))}
      </div>
    </div>
  );
}
