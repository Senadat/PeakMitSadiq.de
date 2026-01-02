import { CoachingCardType } from "@/types/coaching";
import Image from "next/image";

export default function CarouselCard({
  cardData,
  width,
  minHeight,
  maxHeight,
}: {
  cardData: CoachingCardType;
  width: string;
  minHeight: number;
  maxHeight: number;
}) {
  return (
    <div
      style={{
        width: `${width}%`,
        height: `clamp(${minHeight}px, 50vw, ${maxHeight}px)`,
      }}
      className="p-2 pb-4 rounded-xl flex-none space-y-3 md:space-y-4 text-center bg-primary"
    >
      <div className="w-full h-[70%] relative rounded-xl">
        <Image
          src={cardData.image}
          fill
          alt="logo"
          className="object-cover rounded-xl"
        />
      </div>
      <p className="2xl:text-[48px] text-[18px] md:text-[20px] lg:text-[24px] xl:text-[30px] text-white font-semibold">
        {cardData.title}
      </p>
      <p className="2xl:text-[24px] text-[10px] sm:text-xs md:text-[16px] lg:text-[18px] xl:text-[20px]">
        {cardData.description}
      </p>
    </div>
  );
}
