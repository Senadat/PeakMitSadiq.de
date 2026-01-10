import { CommitmentType } from "@/types/hero";
import CustomInput from "../customInput";

export default function SectionD() {
  const options: CommitmentType[] = [
    "Ja, ich will meinen PEAK erreichen!",
    "Nein, ich bin aktuell noch nicht bereit",
  ];

  return (
    <div
      className="
        bg-transparent
        flex flex-col justify-center
        gap-4 sm:gap-5 lg:gap-4
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
        Bereit, Ausreden abzulegen und in deinen persönlichen Peak zu
        investieren?
      </p>

      {/* Options */}
      <div
        className="
          flex flex-col items-center justify-center
          gap-2 sm:gap-3 lg:gap-4 
        "
      >
        {options.map((opt) => (
          <CustomInput key={opt} field="d" value={opt} />
        ))}
      </div>
    </div>
  );
}
