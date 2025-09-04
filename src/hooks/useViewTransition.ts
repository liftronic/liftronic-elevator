"use client";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export function useViewTransition() {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const transitionTo = useCallback(
    (url: string) => {
      // Prevent multiple rapid transitions
      if (isTransitioning.current) {
        return;
      }

      // Check if View Transition API is supported
      if (!document.startViewTransition) {
        // Fallback for browsers that don't support View Transitions
        router.push(url);
        return;
      }

      isTransitioning.current = true;

      // Start the view transition with error handling
      try {
        const transition = document.startViewTransition(() => {
          router.push(url);
        });

        // Reset the flag when transition completes
        transition.finished.finally(() => {
          isTransitioning.current = false;
        });
      } catch (error) {
        // Fallback if transition fails
        console.warn(
          "View transition failed, falling back to regular navigation:",
          error
        );
        isTransitioning.current = false;
        router.push(url);
      }
    },
    [router]
  );

  return { transitionTo };
}
