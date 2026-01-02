"use client";

import { useApp } from "@/context";
import { useEffect } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export function useSectionObserver(sectionId: string, options: Options = {}) {
  const { setCurrentSection } = useApp();

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(sectionId);
        }
      },
      {
        threshold: options.threshold ?? 0.6,
        rootMargin: options.rootMargin ?? "0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId, setCurrentSection, options.threshold, options.rootMargin]);
}
