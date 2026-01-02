import { GenderType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionB() {
  const options: GenderType[] = ["Männlich", "Weiblich", "Divers"];

  return (
    <div className="bg-transparent flex flex-col gap-6">
      <p className="font-semibold text-center">Ich bin</p>
      <div className="flex flex-col items-center justify-center gap-2">
        {options.map((opt) => (
          <CustomInput key={opt} field="b" value={opt} />
        ))}
      </div>
    </div>
  );
}
