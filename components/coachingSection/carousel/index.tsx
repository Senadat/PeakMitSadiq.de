import { useCarousel } from "./context";
import CarouselControls from "./ui/controls";
import CarouselSteps from "./ui/steps";
import CarouselCard from "./ui/card";

export default function CoachingCarousel() {
  const {
    currentIndex,
    items,
    translateX,
    transitionDuration,
    isTransitionLeft,
    isTranslating,
    isChangingStep,
    cardGap,
    cardWidth,
  } = useCarousel();

  return (
    <div className="w-full overflow-hidden border">
      <div
        style={{
          left: `calc(${-cardWidth * 6.24}%)`,
          transform: `${
            isTranslating
              ? `translateX(${
                  isTransitionLeft.current
                    ? `calc(${-translateX.current}% - ${
                        isChangingStep ? 0 : cardGap
                      }%)`
                    : `calc(${translateX.current}% + ${
                        isChangingStep ? 0 : cardGap
                      }%)`
                })`
              : ""
          }`,
          transition: `${
            isTranslating
              ? `transform ${transitionDuration.current}ms cubic-bezier(0.645, 0.045, 0.355, 1)
`
              : ""
          }`,
          willChange: "transform",
          gap: `${cardGap}%`,
        }}
        className={`w-[200%] flex items-center relative mb-10`}
      >
        {items.map((opt, i) => (
          <CarouselCard
            key={`coachingOption-${i}`}
            width={`${cardWidth}`}
            cardData={opt}
            minHeight={350}
            maxHeight={500}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl flex items-center border px-8 gap-8">
        <div className="flex items-center justify-center flex-1">
          <CarouselSteps
            totalSteps={items.length / 2}
            currentStep={currentIndex}
          />
        </div>
        <CarouselControls />
      </div>
    </div>
  );
}
