"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import type { TeaserPopup } from "~/sanity/lib/teaserPopupTypes";

interface TeaserPopupModalProps {
  popup: TeaserPopup;
}

// Extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

const SESSION_STORAGE_KEY = "liftronic_teaser_popup_shown";

export default function TeaserPopupModal({ popup }: TeaserPopupModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const videoId = extractYouTubeId(popup.videoUrl);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Mark as shown in session storage
    if (popup.showOncePerSession) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch {
        // Ignore storage errors
      }
    }
  }, [popup.showOncePerSession]);

  useEffect(() => {
    // Check if already shown this session
    if (popup.showOncePerSession) {
      try {
        const alreadyShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (alreadyShown === "true") {
          return;
        }
      } catch {
        // Ignore storage errors
      }
    }

    // Set timer to show popup
    const delayMs = (popup.delaySeconds || 10) * 1000;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [popup.delaySeconds, popup.showOncePerSession]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVisible, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!videoId) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close popup"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {popup.title}
              </h3>
              {popup.description && (
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                  {popup.description}
                </p>
              )}
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&showinfo=0&fs=0&loop=1&playlist=${videoId}`}
                title={popup.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
