"use client";

import { coachingOptions } from "@/lib/data/carousel";
import { CoachingCardType } from "@/types/coaching";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

type CarouselContextType = {
  // state
  items: CoachingCardType[];
  currentIndex: number;
  isTranslating: boolean;
  isChangingStep: boolean;

  // refs (exposed if UI needs them)
  currentIndexRef: React.RefObject<number>;
  translateX: React.RefObject<number>;
  transitionDuration: React.RefObject<number>;
  isTransitionLeft: React.RefObject<boolean>;

  // actions
  setItems: React.Dispatch<React.SetStateAction<CoachingCardType[]>>;
  setCurrentIndex: (i: number) => void;
  next: () => void;
  prev: () => void;
  handleStepClick: (index: number) => void;

  // meta
  length: number;
  cardWidth: number;
  cardGap: number;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

type CarouselProviderProps = {
  children: ReactNode;
  length: number; // %
  cardWidth: number;
  cardGap: number;
};

export function CarouselProvider({
  children,
  length,
  cardWidth,
  cardGap,
}: CarouselProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [items, setItems] = useState<CoachingCardType[]>([
    ...coachingOptions,
    ...coachingOptions,
  ]);

  const currentIndexRef = useRef<number>(1);
  const translateX = useRef<number>(cardWidth);
  const transitionDuration = useRef<number>(500);
  const isTransitionLeft = useRef<boolean>(false);

  const [isTranslating, setIsTranslating] = useState(false);
  const [isChangingStep, setIsChangingStep] = useState(false);

  function next() {
    if (isTranslating) return;

    translateX.current = cardWidth;
    isTransitionLeft.current = true;
    setIsTranslating(true);

    const totalLength = items.length / 2;

    currentIndexRef.current = (currentIndexRef.current + 1) % totalLength;

    setCurrentIndex((prev) => (prev + 1) % totalLength);

    const updatedItems = [...items, items[0]];
    updatedItems.shift();

    setTimeout(() => {
      setItems(updatedItems);
      setIsTranslating(false);
    }, transitionDuration.current);
  }

  function prev() {
    if (isTranslating) return;

    translateX.current = cardWidth;
    isTransitionLeft.current = false;
    setIsTranslating(true);

    const totalLength = items.length / 2;

    currentIndexRef.current =
      (currentIndexRef.current - 1 + totalLength) % totalLength;

    setCurrentIndex((prev) => (prev - 1 + totalLength) % totalLength);

    const updatedItems = [items[items.length - 1], ...items];
    updatedItems.pop();

    setTimeout(() => {
      setItems(updatedItems);
      setIsTranslating(false);
    }, transitionDuration.current);
  }

  function handleStepClick(stepIndex: number) {
    if (stepIndex === currentIndex || isTranslating) return;
    setIsTranslating(true);
    const stepsToMove = stepIndex - currentIndex;
    translateX.current =
      stepsToMove < 0
        ? Math.abs(stepsToMove) * cardWidth - stepsToMove * cardGap
        : Math.abs(stepsToMove) * cardWidth + stepsToMove * cardGap;
    const direction = stepsToMove > 0 ? "left" : "right";
    const totalLength = items.length / 2;
    isTransitionLeft.current = direction === "left";
    let updatedItems: CoachingCardType[] = [];

    if (stepIndex === totalLength - 1 && currentIndex === 0) {
      prev();
      return;
    } else if (stepIndex === 0 && currentIndex === totalLength - 1) {
      next();
      return;
    } else if (stepsToMove === 1) {
      next();
      return;
    } else if (stepsToMove === -1) {
      prev();
      return;
    }

    setIsChangingStep(true);
    if (direction === "left") {
      for (let i = 0; i < stepsToMove; i++) {
        updatedItems.push(items[i]);
      }
      updatedItems = [...items, ...updatedItems];
      updatedItems.splice(0, stepsToMove);
    } else if (direction === "right") {
      const numberShift = items.length - 1;
      for (let i = 0; i < Math.abs(stepsToMove); i++) {
        updatedItems.unshift(items[numberShift - i]);
      }
      updatedItems = [...updatedItems, ...items];
      updatedItems.splice(stepsToMove, Math.abs(stepsToMove));
    }
    currentIndexRef.current = stepIndex;
    setCurrentIndex(stepIndex);
    setTimeout(() => {
      setItems(updatedItems);
      setIsTranslating(false);
      setIsChangingStep(false);
    }, transitionDuration.current);
  }

  return (
    <CarouselContext.Provider
      value={{
        // state
        items,
        currentIndex,
        isTranslating,
        isChangingStep,

        // refs
        currentIndexRef,
        translateX,
        transitionDuration,
        isTransitionLeft,

        // setters & actions
        setItems,
        setCurrentIndex,
        next,
        prev,
        handleStepClick,

        // meta
        length,
        cardGap,
        cardWidth,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
}
