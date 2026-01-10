"use client";

import { HeroFormData } from "@/types/hero";
import { PricingCardType } from "@/types/pricing";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
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
  showSuccess: boolean;
  setShowSuccess: (value: boolean) => void;
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
    "/hero7.jpeg",
    "/hero6.jpeg",
    "/hero5.jpeg",
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<PricingCardType>({
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
  });

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

  useEffect(() => {
    if (formData.d !== "") {
      const sectionId =
        formData.d === "Ja, ich will meinen PEAK erreichen!"
          ? "pricing"
          : "contact";

      if (!hasCompletedForm) {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
        setHasCompletedForm(true);
      }
    }
  }, [formData]);

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
        showSuccess,
        setShowSuccess,
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
