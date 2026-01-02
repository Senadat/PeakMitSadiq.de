import { GoalType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionA() {
  const options: GoalType[] = [
    "Schmerzfrei & Gesund im Alltag",
    "Gewichtsabnahme",
    "Muskelaufbau",
  ];

  return (
    <div className="bg-transparent flex flex-col items-center gap-6">
      <p className="font-semibold text-center">
        Wobei kann ich dich unterstützen?
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        {options.map((opt) => (
          <CustomInput key={opt} field="a" value={opt} />
        ))}
      </div>
    </div>
  );
}
