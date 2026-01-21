"use client";
import React from "react";
import { useCarousel } from "../../context";

interface StepsProps {
  totalSteps: number;
  currentStep: number;
}

const CarouselSteps: React.FC<StepsProps> = ({ totalSteps, currentStep }) => {
  const { handleStepClick, transitionDuration, isChangingStep } = useCarousel();

  return (
    <div className="flex justify-center items-center gap-3">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          onClick={() => {
            if (isChangingStep) return;
            handleStepClick(index);
          }}
          key={index}
          style={{
            transition: `background-color ${transitionDuration.current}ms cubic-bezier(0.68, -0.55, 0.27, 1.55)`,
            willChange: "background-color",
          }}
          // #0a1f0d, #184d47, #32cd32, #154734
          className={`w-4 h-4 rounded-full transition-colors duration-300 cursor-pointer  ${
            currentStep === index
              ? "bg-primary hover:bg-primary"
              : " bg-white/10 hover:bg-primary/50 "
          }`}
        />
      ))}
    </div>
  );
};

export default CarouselSteps;
