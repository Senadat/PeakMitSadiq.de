export type GoalType =
  | "Schmerzfrei & Gesund im Alltag"
  | "Gewichtsabnahme"
  | "Muskelaufbau"
  | "";

export type GenderType = "Männlich" | "Weiblich" | "Divers" | "";

export type AgeRangeType = "18-25" | "26-33" | "34-45" | "46+" | "";

export type CommitmentType =
  | "Ja, ich will meinen PEAK erreichen!"
  | "Nein, ich bin aktuell noch nicht bereit"
  | "";

export interface HeroFormData {
  a: GoalType;
  b: GenderType;
  c: AgeRangeType;
  d: CommitmentType;
  e: string;
}

export type HeroFormField = keyof HeroFormData;
// "a" | "b" | "c" | "d"
