"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

// Extend Window interface for Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
      config?: Record<string, unknown>;
    };
  }
}

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState(false);

  // Load Tally embed script and reinitialize on mount
  useEffect(() => {
    if (!isOpen) return;

    let timeoutId: NodeJS.Timeout;

    const initializeTallyForm = () => {
      if (window.Tally && typeof window.Tally.loadEmbeds === "function") {
        window.Tally.loadEmbeds();
        setFormLoaded(true);

        // Verify form loaded successfully
        timeoutId = setTimeout(() => {
          const iframe = document.querySelector(
            'iframe[data-tally-src*="mV2Vz6"]'
          );
          if (!iframe || !(iframe as HTMLIFrameElement).src) {
            setFormError(true);
          }
        }, 3000);
      } else {
        // Retry if Tally is not ready yet
        timeoutId = setTimeout(initializeTallyForm, 500);
      }
    };

    const existingScript = document.querySelector(
      'script[src*="tally.so/widgets/embed.js"]'
    );

    if (existingScript) {
      // Script already loaded, reinitialize the form
      initializeTallyForm();
    } else {
      // Load script for the first time
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;

      script.onload = () => {
        setTimeout(initializeTallyForm, 300);
      };

      script.onerror = () => {
        setFormError(true);
      };

      document.body.appendChild(script);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);


  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                Download Catalog
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Form Container */}
            <div className="relative bg-white p-6 flex-1 overflow-y-auto">
              {/* Loading State */}
              {!formLoaded && !formError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-4"></div>
                    <p className="text-gray-600">Loading form...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {formError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="text-center px-6">
                    <p className="text-gray-600 mb-4">
                      Having trouble loading the form?
                    </p>
                    <a
                      href="https://tally.so/r/mV2Vz6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    >
                      Open Form in New Tab
                    </a>
                  </div>
                </div>
              )}

              {/* Tally Form Iframe */}
              <iframe
                data-tally-src="https://tally.so/embed/mV2Vz6?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                loading="eager"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Download Catalog Form"
                onLoad={() => setFormLoaded(true)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
