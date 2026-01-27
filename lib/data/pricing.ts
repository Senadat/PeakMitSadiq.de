import { PricingCardType } from "@/types/pricing";

export const homeOptions: PricingCardType[] = [
  {
    id: "home-muscle-gain",
    price: 1700,
    package: "Peak Muscle Gain Home",
    plan: "home",
    features: [
      "24 Einheiten Personal Training (60 Min.) bei dir zu Hause oder outdoor",
      "Anfahrt bis 30 km inklusive",
      "Trainer bringt Equipment mit",
      "Muskelaufbau-orientierter Trainingsplan",
      "Ernährungs-Guide für Muskelaufbau",
      "Start-Körperanalyse",
      "Wöchentliche Check-ins",
      "WhatsApp-Support",
      "Abschlussanalyse",
    ],
    duration: 60,
  },
  {
    id: "home-pain-free",
    price: 1700,
    package: "PeakPainFree Home",
    plan: "home",
    duration: 60,
    features: [
      "24 Einheiten Personal Training (60 Min.) bei dir zu Hause oder outdoor",
      "Anfahrt innerhalb 30 km inklusive",
      "Trainer bringt benötigtes Equipment mit",
      "Individueller Trainingsplan",
      "Körperanalyse zu Beginn",
      "Ernährungs-Guide für Regeneration",
      "Wöchentliche Check-ins",
      "WhatsApp-Support für schnelle Fragen",
      "Abschlussanalyse",
    ],
  },

  {
    id: "home-weight-loss",
    price: 1700,
    package: "Peak Weight Loss Home",
    plan: "home",
    features: [
      "24 Einheiten Personal Training (60 Min.) zu Hause oder outdoor",
      "Anfahrt bis 30 km inklusive",
      "Trainer bringt Equipment mit",
      "Fettabbau-orientierter Trainingsplan",
      "Ernährungs-Guide für Gewichtsreduktion",
      "Start-Körperanalyse",
      "Wöchentliche Check-ins",
      "WhatsApp-Support",
      "Abschlussanalyse",
    ],
    duration: 60,
  },
];

export const gymOptions: PricingCardType[] = [
  {
    id: "gym-muscle-gain",
    price: 1500,
    package: "Peak Muscle Gain Gym",
    plan: "gym",
    duration: 60,
    features: [
      "24 Einheiten Personal Training (60 Min.) im Studio",
      "Muskelaufbau-orientierter Trainingsplan",
      "Ernährungs-Guide für Muskelaufbau",
      "Start-Körperanalyse",
      "Wöchentliche Check-ins",
      "WhatsApp-Support",
      "Abschlussanalyse",
    ],
  },
  {
    id: "gym-pain-free",
    price: 1500,
    package: "PeakPainFree Gym",
    plan: "gym",
    duration: 60,
    features: [
      "24 Einheiten Personal Training (60 Min.) im Studio",
      "Körperanalyse",
      "Ernährungs-Guide für Regeneration",
      "Trainingsprogramm",
      "Fokus auf persönlichen Ziele",
      "Wöchentliche Check-ins",
      "Whats-App Verfügbarkeit für schnelle Fragen",
      "Abschlussanalyse",
    ],
  },
  {
    id: "gym-weight-loss",
    price: 1500,
    package: "Peak Weight Loss Gym",
    plan: "gym",
    duration: 60,
    features: [
      "24 Einheiten Personal Training (60 Min.) im Studio",
      "Fettabbau-orientierter Trainingsplan",
      "Ernährungs-Guide für Gewichtsreduktion",
      "Start-Körperanalyse",
      "Wöchentliche Check-ins",
      "WhatsApp-Support",
      "Abschlussanalyse",
    ],
  },
];

export const personalOptions: PricingCardType[] = [
  {
    id: "personal-gym-60",
    price: (71.4).toFixed(2),
    package: `1:1 Personal Training
Studio
(60 Minuten)`,
    plan: "personal",
    duration: 60,
    features: [
      "60 Min gezieltes Training im PT-Studio",
      "Individueller Trainingsplan",
      "Technik-Coaching während der Einheit",
    ],
  },
  {
    id: "personal-home-60",
    price: (99.4).toFixed(2),
    package: `1:1 Personal Training
Zuhause / Outdoor
(60 Minuten)`,
    plan: "personal",
    duration: 60,
    features: [
      "60 Min Training bei dir zuhause / outdoor (bis 30 km Anfahrt)",
      "Individueller Trainingsplan",
      "Trainer bringt nötiges Equipment mit",
    ],
  },
  {
    id: "personal-gym-30",
    price: 41.65,
    package: `1:1 Personal Training
Studio
(30 Minuten)`,
    plan: "personal",
    duration: 30,
    features: [
      "30 Min intensives Training im PT-Studio",
      "Individueller Trainingsplan",
      "Technik-Coaching während der Einheit",
    ],
  },
  {
    id: "personal-home-30",
    price: 49.65,
    package: `1:1 Personal Training
Zuhause / Outdoor
(30 Minuten)`,
    plan: "personal",
    duration: 30,
    features: [
      "30 Min Training bei dir zuhause / outdoor (bis 30 km Anfahrt)",
      "Individueller Trainingsplan",
      "Trainer bringt nötiges Equipment mit",
    ],
  },
];
