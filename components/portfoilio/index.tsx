"use client";

import Image from "next/image";
import SectionHeading from "../heading";
import { motion } from "framer-motion";

const portfolioData = [
  { before: "/before1.jpg", after: "/after1.jpg" },
  { before: "/before2.jpg", after: "/after2.jpg" },
  { before: "/before3.jpg", after: "/after3.jpg" },
];

export default function Portfolio() {
  return (
    <section id="clients" className="py-10 lg:py-20 w-full">
      <div>
        <SectionHeading>
          Echte Ergebnisse <br />
          echte Stimmen
        </SectionHeading>

        <div className="flex flex-col lg:flex-row w-full md:w-3/4 xl:w-2/4 mx-auto justify-evenly gap-10 px-4">
          {portfolioData.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 w-full max-w-sm mx-auto lg:mx-0"
              initial={{
                opacity: 0,
                x: i === 0 ? -50 : i === 2 ? 50 : 0,
                y: i === 1 ? 50 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {["before", "after"].map((type) => (
                <motion.div
                  key={type}
                  className="w-full aspect-5/4 relative rounded-lg overflow-hidden shadow-lg border-2 border-[#443737]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold opacity-80 text-white drop-shadow-lg">
                      {type === "before" ? "Vorher" : "Nachher"}
                    </h1>
                  </div>
                  <Image
                    src={item[type as "before" | "after"]}
                    alt={`${type} image`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
