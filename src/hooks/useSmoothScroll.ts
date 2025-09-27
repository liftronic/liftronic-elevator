"use client";
import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollTo };
}
