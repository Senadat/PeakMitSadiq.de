"use client";

import Footer from "./footer";
import Navbar from "./navbar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
