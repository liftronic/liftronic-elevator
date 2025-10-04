"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { GalleryImage } from "~/sanity/lib/productTypes";

type ProductGalleryModalProps = {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  productTitle: string;
};

export default function ProductGalleryModal({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  productTitle,
}: ProductGalleryModalProps) {
  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && hasMultiple) {
        onNext();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasMultiple, onClose, onNext, onPrevious]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <HiX className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          {hasMultiple && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Previous image"
              >
                <HiChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Next image"
              >
                <HiChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Image content */}
          <div className="relative">
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image
                src={currentImage.url}
                alt={currentImage.alt || `${productTitle} gallery image`}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 80vw, 100vw"
                quality={95}
                priority
              />
            </div>
          </div>

          {/* Info section */}
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-charcoal">
                {currentImage.alt || productTitle}
              </h2>
              {hasMultiple && (
                <span className="text-sm text-gray-500 font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>
            <p className="text-gray-600">
              {currentImage.alt
                ? `${productTitle} - Detailed view`
                : `Gallery image ${currentIndex + 1} of ${images.length}`}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
