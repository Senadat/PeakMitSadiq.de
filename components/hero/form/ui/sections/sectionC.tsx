import { AgeRangeType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionC() {
  const options: AgeRangeType[] = ["18-25", "20-33", "34-45"];

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
        Wie alt bist du?
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-4
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="c" value={opt} />
        ))}
      </div>
    </div>
  );
}
