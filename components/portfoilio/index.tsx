"use client";

import Image from "next/image";
import SectionHeading from "../heading";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "../lightbox";

const portfolioData = [
  { before: "/before1.jpg", after: "/after1.jpg" },
  { before: "/before2.jpg", after: "/after2.jpg" },
  { before: "/before3.jpg", after: "/after3.jpg" },
];

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Flatten all images into a single array for the lightbox
  const allImages = portfolioData.flatMap((item) => [
    { url: item.before },
    { url: item.after },
  ]);

  const handleImageClick = (
    portfolioIndex: number,
    type: "before" | "after"
  ) => {
    // Calculate the index in the flattened array
    const imageIndex = portfolioIndex * 2 + (type === "before" ? 0 : 1);
    setSelectedImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <section id="clients" className="py-10 lg:py-20 w-full">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>
            Echte Ergebnisse <br />
            echte Stimmen
          </SectionHeading>
        </motion.div>

        <div className="flex flex-col lg:flex-row w-full lg:w-5/6 xl:w-4/5 2xl:w-3/4 mx-auto justify-center gap-8 lg:gap-10 xl:gap-12 px-4">
          {portfolioData.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-md mx-auto lg:mx-0"
              initial={{
                opacity: 0,
                x: i === 0 ? -50 : i === 2 ? 50 : 0,
                y: i === 1 ? 50 : 0,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {/* Before Image */}
              <motion.div
                className="w-full cursor-pointer aspect-4/3 relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200 hover:border-primary group"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(i, "before")}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                    Vorher
                  </h1>
                </div>
                <Image
                  src={item.before}
                  alt="Before transformation"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* After Image */}
              <motion.div
                className="w-full cursor-pointer aspect-4/3 relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200 hover:border-primary group"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(i, "after")}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                    Nachher
                  </h1>
                </div>
                <Image
                  src={item.after}
                  alt="After transformation"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
}
