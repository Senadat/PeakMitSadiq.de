export interface RecommendationProps {
  goal: string; //GoalType
  age_group: string;
  focus: string;
  justification: string;
  focus_short: string;
}

export default function RecommendationContent({
  data,
}: {
  data: RecommendationProps;
}) {
  const { goal, age_group, focus, justification, focus_short } = data;
  return (
    <div className="w-full space-y-4 text-[clamp(18px,2vw,36px)]">
      <p className="mb-4">
        {" "}
        Du möchtest aktuell an{" "}
        <span className="font-bold text-primary">{goal}</span> arbeiten.
        <br />
        Das ist ein klares Ziel und ein guter Ausgangspunkt für mein Coaching.
      </p>
      <p>
        Mit deiner Altersgruppe{" "}
        <span className="font-bold text-primary">{age_group}</span> ist es
        besonders sinnvoll, den Fokus auf{" "}
        <span className="font-bold text-primary">{focus}</span> zu legen.
        <br></br>
        <span className="font-bold text-primary">{justification}</span>
      </p>
      <p>
        Das hier ist mein erster Vorschlag für dich und bewusst kein endgültiger
        Trainingsplan. Gutes Coaching entwickelt sich im Austausch.
      </p>
      <p>
        Als nächsten sinnvollen Schritt sehe ich ein Training, das auf{" "}
        <span className="font-bold text-primary">{focus_short}</span> fokussiert
        ist und deinem aktuellen Stand entspricht.
      </p>
      <p>
        Dafür habe ich ein passendes Paket für dich vorbereitet.
        <br /> Wenn du eine genauere Einschätzung möchtest, melde dich gern
        direkt bei mir.
      </p>
    </div>
  );
}
