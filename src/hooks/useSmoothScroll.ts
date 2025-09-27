"use client";
import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback(
    (selector: string, onScrollEnd?: () => void) => {
      const element = document.querySelector(selector);
      if (element) {
        let scrollEndTimer: NodeJS.Timeout;

        const handleScroll = () => {
          clearTimeout(scrollEndTimer);
          scrollEndTimer = setTimeout(() => {
            window.removeEventListener("scroll", handleScroll);
            if (onScrollEnd) {
              onScrollEnd();
            }
          }, 150); // Assumes scrolling has ended after 150ms of inactivity
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return { scrollTo };
}
