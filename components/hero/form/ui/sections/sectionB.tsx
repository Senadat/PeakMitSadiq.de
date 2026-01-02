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
        className="
          font-semibold text-center
          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-[40px]
        "
      >
        Ich bin
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-2
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="b" value={opt} />
        ))}
      </div>
    </div>
  );
}
