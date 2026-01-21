import { CommitmentType } from "@/types/hero";
import CustomInput from "../customInput";
import styles from "./section.module.css";

export default function SectionD() {
  const options: CommitmentType[] = [
    "Ja, ich will meinen PEAK erreichen!",
    "Nein, ich bin aktuell noch nicht bereit",
  ];

  return (
    <div className={`${styles.parent}`}>
      {/* Heading */}
      <p className={`${styles.heading}`}>
        Bereit, Ausreden abzulegen und in deinen persönlichen Peak zu
        investieren?
      </p>

      {/* Options */}
      <div className={`${styles.options}`}>
        {options.map((opt) => (
          <CustomInput key={opt} field="d" value={opt} />
        ))}
      </div>

      <p className={`${styles.notice}`}>
        Deine Antworten helfen mir, deine Situation richtig einzuordnen.
      </p>
    </div>
  );
}
