import { CommitmentType } from "@/types/hero";
import CustomInput from "../customInput";
import { useApp } from "@/context";
import { useEffect } from "react";

export default function SectionD() {
  const { formData, hasCompletedForm, setHasCompletedForm } = useApp();

  const options: CommitmentType[] = [
    "Ja, ich will meinen PEAK erreichen!",
    "Nein, ich bin aktuell noch nicht bereit",
  ];

  return (
    <div
      className="
        bg-transparent
        flex flex-col justify-center
        gap-4 sm:gap-5 lg:gap-6
      "
    >
      {/* Heading */}
      <p
        className="
          font-semibold text-center
          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-[40px]
        "
      >
        Bereit, Ausreden abzulegen und in deinen persönlichen Peak zu
        investieren?
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-2
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="d" value={opt} />
        ))}
      </div>
    </div>
  );
}
