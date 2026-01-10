import SectionHeading from "../heading";
import { CarouselProvider } from "./carousel/context";
import CoachingCarousel from "./carousel";
import { coachingOptions } from "@/lib/data/carousel";

export default function Coaching() {
  return (
    <section id="services" className="py-8 md:py-16">
      <SectionHeading className="">
        Persöhnliches
        <br /> Coaching in <br />
        Iserlohn
      </SectionHeading>
      <p
        style={{
          fontSize: "clamp(18px, 2vw, 36px)",
        }}
        className="
        px-10
    text-center
    mb-4 sm:mb-5 md:mb-10
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
      <div className="hidden md:block">
        {
          <CarouselProvider
            length={coachingOptions.length}
            cardGap={1}
            cardWidth={15}
          >
            <CoachingCarousel left={`calc(${-15 * 6.2}%)`} />
          </CarouselProvider>
        }
      </div>
      <div className="md:hidden">
        {
          <CarouselProvider
            length={coachingOptions.length}
            cardGap={1}
            cardWidth={30}
          >
            <CoachingCarousel left={`calc(${-30 * 7.5}%)`} />
          </CarouselProvider>
        }
      </div>
    </section>
  );
}
