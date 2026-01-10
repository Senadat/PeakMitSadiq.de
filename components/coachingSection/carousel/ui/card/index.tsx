import { CoachingCardType } from "@/types/coaching";
import Image from "next/image";

export default function CarouselCard({
  cardData,
  width,
}: // minHeight,
// maxHeight,
{
  cardData: CoachingCardType;
  width: string;
  minHeight: number;
  maxHeight: number;
}) {
  return (
    <div
      style={{
        width: `${width}%`,
        // height: `clamp(${minHeight}px, 50vw, ${maxHeight}px)`,
      }}
      className="p-2 pb-4 rounded-xl flex-none space-y-3 md:space-y-4 text-center bg-primary"
    >
      <div className="w-full h-50 md:h-62.5 lg:h-75 relative rounded-xl">
        <Image
          src={cardData.image}
          fill
          alt="logo"
          className="object-cover rounded-xl"
        />
      </div>
      <p
        style={{
          fontSize: "clamp(16px, 1.8vw, 24px)",
        }}
        className=" text-white font-semibold"
      >
        {cardData.title}
      </p>
      <p
        style={{
          fontSize: "clamp(12px, 1.4vw, 18px)",
        }}
        className="text-white"
      >
        {cardData.description}
      </p>
    </div>
  );
}
