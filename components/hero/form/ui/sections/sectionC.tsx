import { AgeRangeType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionC() {
  const options: AgeRangeType[] = ["18-25", "20-33", "34-45"];

  return (
    <div className="bg-transparent flex flex-col gap-6">
      <p className="font-semibold text-center text-[40px]">Wie alt bist du?</p>
      <div className="flex flex-col items-center justify-center gap-2">
        {options.map((opt) => (
          <CustomInput key={opt} field="c" value={opt} />
        ))}
      </div>
    </div>
  );
}
