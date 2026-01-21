import { RecommendationProps } from "@/components/recommendations/content";
import { GoalType, AgeRangeType } from "@/types/hero";

type RecommendationMap = {
  [goal in Exclude<GoalType, "">]: {
    [age in Exclude<AgeRangeType, "">]: Omit<
      RecommendationProps,
      "goal" | "age_group"
    >;
  };
};

export const RECOMMENDATIONS: RecommendationMap = {
  Muskelaufbau: {
    "18-25": {
      focus: "eine solide Kraftbasis und saubere Technik aufzubauen",
      focus_short: "Grundlagen & Basiskraft",
      justification:
        "In diesem Alter reagiert der Körper besonders gut auf systematisches Krafttraining. Eine starke Basis hilft dir, langfristig effektiv Muskeln aufzubauen und Verletzungen zu vermeiden.",
    },
    "26-33": {
      focus: "funktionelle Kraft und gezielten Muskelaufbau zu kombinieren",
      focus_short: "Funktionelle Kraft",
      justification:
        "In dieser Phase ist es wichtig, Kraft, Stabilität und Muskelaufbau sinnvoll zu verbinden, damit dein Training nachhaltig und leistungsfähig bleibt.",
    },
    "34-45": {
      focus:
        "funktionelle Kraft mit besonderem Fokus auf Stabilität aufzubauen",
      focus_short: "Funktionelle Kraft",
      justification:
        "Mit zunehmender Belastung im Alltag wird es wichtiger, Kraft mit Stabilität zu verbinden, um leistungsfähig zu bleiben und Beschwerden vorzubeugen.",
    },
    "46+": {
      focus:
        "gelenkschonenden Muskelaufbau mit Fokus auf Stabilität zu verfolgen",
      focus_short: "Gelenkschonender Muskelaufbau",
      justification:
        "In diesem Alter stehen Gelenkschutz und saubere Bewegungsführung im Vordergrund, damit Muskelaufbau sicher und langfristig möglich bleibt.",
    },
  },

  "Schmerzfrei & Gesund im Alltag": {
    "18-25": {
      focus:
        "grundlegende Bewegungsgewohnheiten und Körperwahrnehmung zu verbessern",
      focus_short: "Grundlegende Beweglichkeit",
      justification:
        "In diesem Alter lassen sich Fehlhaltungen und ungünstige Bewegungsmuster besonders gut korrigieren, bevor sie zu langfristigen Problemen werden.",
    },
    "26-33": {
      focus: "funktionelle Beweglichkeit und stabile Grundlagen aufzubauen",
      focus_short: "Funktionelle Beweglichkeit",
      justification:
        "In dieser Phase hilft funktionelle Beweglichkeit, Belastungen aus Beruf und Alltag besser auszugleichen und Beschwerden vorzubeugen.",
    },
    "34-45": {
      focus: "Haltung, Beweglichkeit und gezielte Entlastung zu verbessern",
      focus_short: "Haltung & Entlastung",
      justification:
        "Mit zunehmender Alltagsbelastung wird es wichtig, Haltung und Regeneration gezielt zu trainieren, um Schmerzen nachhaltig zu reduzieren.",
    },
    "46+": {
      focus:
        "sanfte Beweglichkeit, Gleichgewicht und gelenkschonende Kräftigung zu fördern",
      focus_short: "Gelenkpflege & Stabilität",
      justification:
        "In diesem Alter stehen Gelenkschutz, Gleichgewicht und schonende Belastung im Vordergrund, um Beweglichkeit und Lebensqualität zu erhalten.",
    },
  },

  Gewichtsabnahme: {
    "18-25": {
      focus: "Grundlagen der Ernährung und aktive Gewohnheiten zu etablieren",
      focus_short: "Ernährungsgrundlagen",
      justification:
        "In diesem Alter lassen sich gesunde Routinen besonders leicht aufbauen, die langfristig den Stoffwechsel unterstützen und Gewicht regulieren.",
    },
    "26-33": {
      focus:
        "nachhaltige Gewohnheiten für Bewegung und Ernährung zu entwickeln",
      focus_short: "Gesunde Gewohnheiten",
      justification:
        "In dieser Phase helfen stabile Gewohnheiten dabei, Gewicht dauerhaft zu reduzieren und Rückfälle zu vermeiden.",
    },
    "34-45": {
      focus:
        "nachhaltige Lebensgewohnheiten und gezielte Bewegung zu kombinieren",
      focus_short: "Nachhaltige Gewohnheiten",
      justification:
        "Mit steigender Alltagsbelastung ist es wichtig, Ernährung und Bewegung realistisch und langfristig in den Alltag zu integrieren.",
    },
    "46+": {
      focus:
        "langfristige Lebensstiländerungen mit schonender Aktivität umzusetzen",
      focus_short: "Nachhaltige Lebensstiländerung",
      justification:
        "In diesem Alter steht Nachhaltigkeit im Vordergrund, um Gewicht sicher zu reduzieren und Gesundheit dauerhaft zu verbessern.",
    },
  },
};
