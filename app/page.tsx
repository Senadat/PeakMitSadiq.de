"use client";

import About from "@/components/about";
import Coaching from "@/components/coachingSection";
import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Portfolio from "@/components/portfoilio";
import Pricing from "@/components/pricing";
import Recommendations from "@/components/recommendations";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <div id="recommendation">
        {" "}
        <Recommendations />
      </div>
      <Portfolio />
      <About />
      <Coaching />
      <Pricing />
      <Contact />
    </div>
  );
}
