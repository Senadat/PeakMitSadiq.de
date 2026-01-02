import { CommitmentType } from "@/types/hero";
import CustomInput from "../customInput";
import { useApp } from "@/context";
import { useEffect } from "react";

export default function SectionD() {
  const { formData, hasCompletedForm, setHasCompletedForm } = useApp();

  useEffect(() => {
    if (formData.d !== "") {
      const sectionId =
        formData.d === "Ja, ich will meinen PEAK erreichen!"
          ? "pricing"
          : "contact";
      const element = document.getElementById(sectionId);
      if (!hasCompletedForm) {
        element?.scrollIntoView({
          behavior: "smooth",
        });
        setHasCompletedForm(true);
      }
    }
  }, [formData]);

  const options: CommitmentType[] = [
    "Ja, ich will meinen PEAK erreichen!",
    "Nein, ich bin aktuell noch nicht bereit",
  ];

  return (
    <div className="bg-transparent flex flex-col gap-6 justify-center">
      <p className="font-semibold text-center">
        Bereit, Ausreden abzulegen und in deinen persönlichen Peak zu
        investieren?
      </p>
      <div className="flex flex-col items-center justify-center gap-2">
        {options.map((opt) => (
          <CustomInput key={opt} field="d" value={opt} />
        ))}
      </div>
    </div>
  );
}
