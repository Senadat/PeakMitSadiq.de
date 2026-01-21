"use client";

import RecommendationBox from "../recommendations/box";
import Footer from "./footer";
import Navbar from "./navbar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background w-full relative">
      <Navbar />
      {children}
      <Footer />
      <RecommendationBox />
    </div>
  );
}
