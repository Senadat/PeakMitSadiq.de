import { GoalType } from "@/types/hero";
import CustomInput from "../customInput";
import styles from "./section.module.css";

export default function SectionA() {
  const options: GoalType[] = [
    "Schmerzfrei & Gesund im Alltag",
    "Gewichtsabnahme",
    "Muskelaufbau",
  ];

  return (
    <div className={`${styles.parent}`}>
      {/* Heading */}
      <p className={`${styles.heading}`}>Wobei kann ich dich unterstützen?</p>

      {/* Options */}
      <div className={`${styles.options}`}>
        {options.map((opt) => (
          <CustomInput key={opt} field="a" value={opt} />
        ))}
      </div>

      {/* Notice */}
      <p className={`${styles.notice}`}>
        Erhalte meine erste Trainingsempfehlung für dich indem du ein paar kurze
        Fragen beantwortest. Damit wir das Gespräch fortsetzen können, benötige
        ich später deine E-Mail. Wenn du noch nicht starten willst, kannst du
        dich auch einfach erst melden.
      </p>
    </div>
  );
}
