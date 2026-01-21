import { AgeRangeType } from "@/types/hero";
import CustomInput from "../customInput";
import styles from "./section.module.css";

export default function SectionC() {
  const options: AgeRangeType[] = ["18-25", "26-33", "34-45", "46+"];

  return (
    <div className={`${styles.parent}`}>
      {/* Heading */}
      <p className={`${styles.heading}`}>Wie alt bist du?</p>

      {/* Options */}
      <div className={`${styles.options}`}>
        {options.map((opt) => (
          <CustomInput key={opt} field="c" value={opt} />
        ))}
      </div>

      <p className={`${styles.notice}`}>
        Deine Antworten helfen mir, deine Situation richtig einzuordnen.
      </p>
    </div>
  );
}
