"use client";

import Coaching from "@/components/coachingSection";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Coaching />
      <Pricing />
    </div>
  );
}
