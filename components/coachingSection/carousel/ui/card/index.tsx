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
      className="p-2 pb-4 rounded-xl flex-none space-y-4 text-center bg-primary"
    >
      <div className="w-full h-[70%] relative rounded-xl">
        <Image
          src={cardData.image}
          fill
          alt="logo"
          className="object-cover rounded-xl"
        />
      </div>
      <p className="text-lg text-white font-semibold">{cardData.title}</p>
      <p className="text-xs">{cardData.description}</p>
    </div>
  );
}
