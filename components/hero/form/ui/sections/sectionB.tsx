import { GenderType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionB() {
  const options: GenderType[] = ["Männlich", "Weiblich", "Divers"];

  return (
    <div
      className="
        bg-transparent
        flex flex-col
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
        Ich bin
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-4
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="b" value={opt} />
        ))}
      </div>
    </div>
  );
}
