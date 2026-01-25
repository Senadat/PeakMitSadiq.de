import { PricingCardType } from "@/types/pricing";
import PricingCard from "../card";
import { useApp } from "@/context";

export default function PriceSection({
  title,
  showCenter = true,
  options,
}: {
  title?: string;
  showCenter?: boolean;
  options: PricingCardType[];
}) {
  const { showRecommendation } = useApp();

  function isRecommended(id: string) {
    return showRecommendation && id === "gym-pain-free";
  }

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12 lg:gap-20">
      {title && (
        <p className="text-[20px] md:text-[22px] xl:text-[26px] font-semibold text-[#D9D9D9]">
          {title}
        </p>
      )}

      <div className="flex flex-col justify-center md:items-stretch items-center md:flex-row flex-wrap gap-[clamp(16px,1%,40px)]">
        {options.map((opt, i) => (
          <PricingCard
            key={`pricing-card-${i}`}
            pricing={opt}
            isCenter={showCenter === true && i === 1}
            isRecommendation={isRecommended(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
