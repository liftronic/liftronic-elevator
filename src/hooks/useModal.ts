import { useEffect } from "react";

interface UseModalOptions {
  /** Whether the modal is currently open. Defaults to `true` (for always-mounted modals). */
  isOpen?: boolean;
  onClose: () => void;
  /** Optional extra key handler — Escape is already handled; use this for arrow keys etc. */
  onKeyDown?: (e: KeyboardEvent) => void;
}

/**
 * Handles the two universal modal side-effects:
 *  1. Locks body scroll while the modal is open.
 *  2. Closes the modal on Escape (and forwards other key events via `onKeyDown`).
 */
export function useModal({ isOpen = true, onClose, onKeyDown }: UseModalOptions) {
  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key + optional extra keys
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      onKeyDown?.(e);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, onKeyDown]);
}
