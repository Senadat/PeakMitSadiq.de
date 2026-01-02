import { PricingCardType } from "@/types/pricing";
import PricingCard from "../card";

export default function PricingSection({
  title,
  showCenter = true,
  options,
}: {
  title?: string;
  showCenter?: boolean;
  options: PricingCardType[];
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      {title && <p className="text-sm font-semibold text-[#D9D9D9]">{title}</p>}

      <div className="flex flex-col justify-center items-center md:flex-row gap-6 md:gap-8">
        {options.map((opt, i) => (
          <PricingCard pricing={opt} isCenter={i === 1 && showCenter} />
        ))}
      </div>
    </div>
  );
}
