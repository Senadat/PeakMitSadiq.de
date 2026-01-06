import { useCarousel } from "./context";
import { useRef, useEffect } from "react";
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
    next,
    prev,
  } = useCarousel();

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragDistance = useRef<number>(0);

  // Minimum swipe distance (in pixels) to trigger navigation
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;

    touchEndX.current = e.touches[0].clientX;
    dragDistance.current = touchStartX.current - touchEndX.current;

    // Optional: Add visual feedback during drag
    // You can update a state here to show the drag progress
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    const swipeDistance = dragDistance.current;

    // Swipe left (next)
    if (swipeDistance > minSwipeDistance) {
      next();
    }
    // Swipe right (prev)
    else if (swipeDistance < -minSwipeDistance) {
      prev();
    }

    // Reset values
    isDragging.current = false;
    dragDistance.current = 0;
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Add touch event listeners
    carousel.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carousel.addEventListener("touchmove", handleTouchMove, { passive: true });
    carousel.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={carouselRef}
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
              ? `transform ${transitionDuration.current}ms cubic-bezier(0.645, 0.045, 0.355, 1)`
              : ""
          }`,
          willChange: "transform",
          gap: `${cardGap}%`,
          touchAction: "pan-y", // Allow vertical scroll but prevent horizontal browser gestures
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        className={`w-[200%] flex items-stretch relative mb-10`}
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

      <div className="w-full max-w-7xl flex items-center px-6 md:px-8 gap-6 md:gap-8">
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
