"use client";

import { navOptions } from "@/lib/data/navigation";
import Logo from "../logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section_1");
  const [showNav, setShowNav] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNav(false); // scrolling down
      } else {
        setShowNav(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;

      // Background on scroll
      setScrolled(currentScrollY > 50);

      // Active section detection
      const sections = ["section_1", "section_2", "section_3", "section_4"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {showNav && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`${
            scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
          } fixed w-full top-0 left-0 flex items-center justify-between px-4 md:px-6 lg:px-8 border z-50 transition-all h-25`}
        >
          {/* Logo */}
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex border">
            <ul className="flex items-center gap-8">
              {navOptions.map((option) => (
                <li key={option.href}>
                  <Link
                    onClick={() => scrollToSection(option.href)}
                    href={option.href}
                    className={`text-shadow-white hover:text-primary transition-colors ${
                      activeSection === option.href.slice(1)
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    {option.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center p-1 rounded-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none cursor-"
            >
              {mobileMenuOpen ? (
                // Close icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-white"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : (
                // Hamburger menu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill=""
                  className="fill-white"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md md:hidden"
              >
                <ul className="flex flex-col items-center gap-4 py-4">
                  {navOptions.map((option) => (
                    <li key={option.href}>
                      <Link
                        onClick={() => scrollToSection(option.href)}
                        href={option.href}
                        className={`text-white text-lg hover:text-primary transition-colors ${
                          activeSection === option.href.slice(1)
                            ? "text-primary font-semibold"
                            : ""
                        }`}
                      >
                        {option.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
