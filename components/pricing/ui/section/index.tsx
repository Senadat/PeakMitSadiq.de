import { PricingCardType } from "@/types/pricing";
import PricingCard from "../card";

export default function PriceSection({
  title,
  showCenter = true,
  options,
}: {
  title?: string;
  showCenter?: boolean;
  options: PricingCardType[];
}) {
  return (
    <div className="flex flex-col items-center gap-10 md:gap-12  lg:gap-20">
      {title && (
        <p className="text-[20px] md:text-[22px] xl:text-[26px] font-semibold text-[#D9D9D9]">
          {title}
        </p>
      )}

      <div className="flex flex-col justify-center items-center md:flex-row gap-10">
        {options.map((opt, i) => (
          <PricingCard
            key={`pricing-card-${i}`}
            pricing={opt}
            isCenter={i === 1 && showCenter}
          />
        ))}
      </div>
    </div>
  );
}
