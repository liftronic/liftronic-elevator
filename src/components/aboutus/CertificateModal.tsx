"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { Certificate } from "~/sanity/lib/certificateTypes";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[90vw] max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white hover:text-gray-900 transition-all shadow-lg"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Certificate details */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {certificate.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{certificate.issuer}</span>
                <span>•</span>
                <span>{certificate.issueDate}</span>
              </div>
              {certificate.description && (
                <p className="mt-3 text-gray-700">{certificate.description}</p>
              )}
            </div>

            {/* Full certificate image */}
            <div className="relative bg-gray-100 flex-1 overflow-y-auto p-4">
              <div className="flex items-start justify-center min-h-full">
                <Image
                  src={certificate.certificateImage}
                  alt={certificate.imageAlt || certificate.title}
                  width={1200}
                  height={1600}
                  className="h-auto w-auto max-w-full object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
