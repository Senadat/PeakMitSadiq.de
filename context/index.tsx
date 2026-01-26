"use client";

import { HeroFormData } from "@/types/hero";
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
  backgroundImages: string[];
  currentHeroImage: string;
  currentFormIndex: number;
  hasCompletedForm: boolean;
  formData: HeroFormData;
  openPricingModal: boolean;
  setOpenPricingModal: (value: boolean) => void;
  showSuccess: boolean;
  setShowSuccess: (value: boolean) => void;
  showRecommendation: boolean;
  setShowRecommendation: (value: boolean) => void;
  scrollToRecommendation: boolean;
  setScrollToRecommendation: (value: boolean) => void;
  showRecommendationBox: boolean;
  setShowRecommendationBox: (value: boolean) => void;
  hideRecommendationBox: boolean;
  setHideRecommendationBox: (value: boolean) => void;
  selectedPricing: string | null;
  setSelectedPricing: (value: string) => void;
  sendingEmail: boolean;
  setSendingEmail: (value: boolean) => void;
  updateFormField: (field: keyof HeroFormData, value: string) => void;
  setCurrentFormIndex: (index: number) => void;
  setHasCompletedForm: (value: boolean) => void;
  setCurrentHeroImage: (value: string) => void;
  imagesLoaded: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

// Move this outside component to prevent recreation
const BACKGROUND_IMAGES = [
  "/hero8.jpg",
  "/hero7.jpg",
  "/coaching3.jpg",
  "/hero4.jpg",
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasCompletedForm, setHasCompletedForm] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [formData, setFormData] = useState<HeroFormData>({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
  });

  const [sendingEmail, setSendingEmail] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(
    BACKGROUND_IMAGES[0],
  );
  const [openPricingModal, setOpenPricingModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showRecommendationBox, setShowRecommendationBox] = useState(false);
  const [hideRecommendationBox, setHideRecommendationBox] = useState(false);
  const [scrollToRecommendation, setScrollToRecommendation] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState("personal-gym-30");

  // Preload all background images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = BACKGROUND_IMAGES.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still set to true to not block the UI
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  // Optimized form update logic - no dependency on backgroundImages
  const updateFormField = useCallback(
    (field: keyof HeroFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      setCurrentFormIndex((prev) => {
        const nextIndex = Math.min(prev + 1, BACKGROUND_IMAGES.length);
        if (nextIndex <= 3) {
          setCurrentHeroImage(BACKGROUND_IMAGES[nextIndex]);
        }
        return nextIndex;
      });
    },
    [], // No dependencies needed
  );

  return (
    <AppContext.Provider
      value={{
        backgroundImages: BACKGROUND_IMAGES,
        currentHeroImage,
        currentFormIndex,
        hasCompletedForm,
        formData,
        selectedPricing,
        setSelectedPricing,
        sendingEmail,
        setSendingEmail,
        openPricingModal,
        setOpenPricingModal,
        showSuccess,
        setShowSuccess,
        updateFormField,
        setCurrentFormIndex,
        setHasCompletedForm,
        setCurrentHeroImage,
        showRecommendation,
        setShowRecommendation,
        showRecommendationBox,
        setShowRecommendationBox,
        hideRecommendationBox,
        setHideRecommendationBox,
        scrollToRecommendation,
        setScrollToRecommendation,
        imagesLoaded,
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
