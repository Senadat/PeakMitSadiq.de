"use client";
import SectionHeading from "../heading";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "../heading";

const aboutSections = [
  {
    img: "/coaching3.jpg",
    alt: "About Me Image",
    text: `Ich bin Sadiq Ajagbe, Personal Trainer mit über zehn Jahren Erfahrung im Fitness- und Teamsport. Meine Laufbahn begann im professionellen Teamsport, wo ich gelernt habe, was es bedeutet, im Team und als Einzelperson alles aus sich herauszuholen.`,
    reverse: false,
  },
  {
    img: "/about1.jpg",
    alt: "About Me Image",
    text: `Als zertifizierter Trainer habe ich mit Leistungssportlern, mit Senioren nach Operationen und mit Menschen gearbeitet, die einfach wieder fitter und schmerzfreier leben möchten. Während meiner Zeit in einer Physiotherapie Praxis konnte ich außerdem wertvolle Einblicke in Rehabilitation und Mobilität sammeln.`,
    reverse: true,
  },
  {
    img: "/hero3.jpg",
    alt: "About Me Image",
    text: `Mein Trainingsansatz ist darauf ausgerichtet, dich Schritt für Schritt an deinen persönlichen Peak zu bringen! Sei es durch Muskelaufbau, Abnehmen oder den Weg zurück zur vollen Beweglichkeit. Mit viel Empathie, Motivation und einem klaren Blick auf deine Ziele begleite ich dich dabei, stärker, beweglicher und insgesamt gesünder zu werden.`,
    reverse: false,
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="w-full  mx-auto px-4">
        <SectionHeading showDecoration={false}>
          Was dich erwartet
        </SectionHeading>

        {aboutSections.map((section, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${
              section.reverse ? "md:flex-row-reverse" : "md:flex-row"
            } justify-evenly items-center gap-10 mt-16`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* IMAGE WRAPPER */}
            <div
              className="
                relative
                w-full
                sm:w-2/3
                md:w-1/2
                xl:w-105
                aspect-4/5
              "
            >
              <Image
                src={section.img}
                alt={section.alt}
                fill
                className="object-cover rounded-lg "
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>

            <p
              style={{
                fontSize: "clamp(18px, 2vw, 36px)",
              }}
              className="
    w-full md:w-1/2
    text-center md:text-left

    first-letter:text-4xl
    sm:first-letter:text-5xl
    lg:first-letter:text-6xl

    first-letter:font-semibold
    first-letter:leading-none
    first-letter:mr-1
        px-10
  
  "
            >
              {section.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
