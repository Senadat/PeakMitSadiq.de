"use client";

import { HeroFormData } from "@/types/hero";
import { PricingCardType } from "@/types/pricing";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type SectionId = string;

interface AppContextValue {
  // hero / form state
  backgroundImages: string[];
  currentHeroImage: string;
  currentFormIndex: number;
  hasCompletedForm: boolean;
  formData: HeroFormData;
  openPricingModal: boolean;
  setOpenPricingModal: (value: boolean) => void;
  selectedPricing: PricingCardType | null;
  setSelectedPricing: (value: PricingCardType) => void;

  // actions
  updateFormField: (field: keyof HeroFormData, value: string) => void;
  setCurrentFormIndex: (index: number) => void;
  setHasCompletedForm: (value: boolean) => void;
  setCurrentHeroImage: (value: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const backgroundImages = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
  ];

  const [hasCompletedForm, setHasCompletedForm] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const [formData, setFormData] = useState<HeroFormData>({
    a: "",
    b: "",
    c: "",
    d: "",
  });

  const [currentHeroImage, setCurrentHeroImage] = useState(backgroundImages[0]);
  const [openPricingModal, setOpenPricingModal] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<PricingCardType>({
    id: "home-muscle-gain",
    price: 1500,
    package: "Peak Muscle Gain Home",
    plan: "home",
    features: [
      "2× pro Woche Personal Training (60 Min.) im PT-Studio",
      "Muskelaufbau-orientierter Trainingsplan",
      "Ernährungs-Guide für Muskelaufbau",
      "Start-Körperanalyse",
      "Wöchentliche Check-ins",
      "WhatsApp-Support",
      "Abschlussanalyse",
    ],
  });

  console.table(formData);

  // form update logic
  const updateFormField = useCallback(
    (field: keyof HeroFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setCurrentFormIndex((prev) => {
        const nextIndex = Math.min(prev + 1, backgroundImages.length - 1);
        setCurrentHeroImage(backgroundImages[nextIndex]);
        return nextIndex;
      });
    },
    [backgroundImages]
  );

  return (
    <AppContext.Provider
      value={{
        backgroundImages,
        currentHeroImage,
        currentFormIndex,
        hasCompletedForm,
        formData,
        selectedPricing,
        setSelectedPricing,
        openPricingModal,
        setOpenPricingModal,

        updateFormField,
        setCurrentFormIndex,
        setHasCompletedForm,
        setCurrentHeroImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
