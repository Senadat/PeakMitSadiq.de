"use client";

import { navOptions } from "@/lib/data/navigation";
import Logo from "../logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("clients");
  const [showNav, setShowNav] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;

      setScrolled(currentScrollY > 50);

      const sections = ["about", "clients", "services", "pricing"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
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
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`
            fixed top-0 left-0 z-50 w-full
            ${scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"}
            transition-all
          `}
        >
          <div
            className="
              flex items-center justify-between
              h-20 sm:h-22 md:h-26
              px-4 sm:px-6 lg:px-8
            "
          >
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6 lg:gap-8 text-base lg:text-lg xl:text-[26px]">
                {navOptions.map((option) => (
                  <li key={option.href}>
                    <Link
                      onClick={() => scrollToSection(option.href)}
                      href={`/${option.href}`}
                      className={`
                        transition-colors
                        hover:text-primary
                        ${
                          activeSection === option.href.slice(1)
                            ? "text-primary font-semibold"
                            : "text-white"
                        }
                      `}
                    >
                      {option.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-6 h-6 fill-white"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="w-6 h-6 fill-white"
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
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="md:hidden bg-black/90 backdrop-blur-md"
              >
                <ul className="flex flex-col items-center gap-4 py-6 text-base">
                  {navOptions.map((option) => (
                    <li key={option.href}>
                      <Link
                        onClick={() => scrollToSection(option.href)}
                        href={`/${option.href}`}
                        className={`
                          transition-colors
                          hover:text-primary
                          ${
                            activeSection === option.href.slice(1)
                              ? "text-primary font-semibold"
                              : "text-white"
                          }
                        `}
                      >
                        {option.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
