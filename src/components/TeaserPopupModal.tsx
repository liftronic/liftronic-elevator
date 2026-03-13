"use client";

import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import type { TeaserPopup } from "~/sanity/lib/teaserPopupTypes";
import { useModal } from "~/hooks/useModal";

type TeaserPopupData = Pick<TeaserPopup, "title" | "description" | "videoUrl">;

interface TeaserPopupModalProps {
  popup: TeaserPopupData;
  isOpen: boolean;
  onClose: () => void;
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

export default function TeaserPopupModal({
  popup,
  isOpen,
  onClose,
}: TeaserPopupModalProps) {
  const videoId = extractYouTubeId(popup.videoUrl);
  const title = popup.title?.trim();

  useModal({ isOpen, onClose });

  if (!videoId) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close popup"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            {/* Header — collapses entirely when title is empty */}
            {title ? (
              <div className="px-6 pt-6 pb-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {title}
                </h3>
              </div>
            ) : null}

            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&showinfo=0&fs=0&loop=1&playlist=${videoId}`}
                title={title || "Teaser popup video"}
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
