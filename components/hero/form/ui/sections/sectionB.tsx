import { GenderType } from "@/types/hero";
import CustomInput from "../customInput";
import styles from "./section.module.css";

export default function SectionB() {
  const options: GenderType[] = ["Männlich", "Weiblich", "Divers"];

  return (
    <div className={`${styles.parent}`}>
      {/* Heading */}
      <p className={`${styles.heading}`}>Ich bin</p>

      {/* Options */}
      <div className={`${styles.options}`}>
        {options.map((opt) => (
          <CustomInput key={opt} field="b" value={opt} />
        ))}
      </div>

      <p className={`${styles.notice}`}>
        Deine Antworten helfen mir, deine Situation richtig einzuordnen.
      </p>
    </div>
  );
}
