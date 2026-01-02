import SectionHeading from "../heading";
import { CarouselProvider } from "./carousel/context";
import CoachingCarousel from "./carousel";
import { coachingOptions } from "@/lib/data/carousel";

export default function Coaching() {
  return (
    <section id="section_3" className="py-8 md:py-16">
      <SectionHeading className="">
        Persöhnliches
        <br /> Coaching in <br />
        Iserlohn
      </SectionHeading>
      <p
        className="
    text-center
    mb-4 sm:mb-5 md:mb-6
    text-lg       /* mobile */
    sm:text-xl    /* small tablets */
    md:text-2xl   /* tablets */
    lg:text-[36px] /* desktop */
    leading-relaxed
    sm:leading-snug
    md:leading-snug
  "
      >
        Nach einem vertraulichen Gespräch über deine Ziele und deinen Werdegang
        <br /> erhältst du einen maßgeschneiderten Trainingsplan. In unseren 1:1
        Sessions im
        <br /> Gym begleite ich dich auf deinem Weg, dein Individuelles Ziel zu
        erreichen.
        <br /> Mit enger Beratung und kontinuierlicher Unterstützung sorgen wir
        dafür, dass du
        <br /> immer auf dem richtigen Kurs bleibst.
      </p>
      {
        <CarouselProvider
          length={coachingOptions.length}
          cardGap={1}
          cardWidth={25}
        >
          <CoachingCarousel />
        </CarouselProvider>
      }
    </section>
  );
}
