"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import ContactForm from "~/components/ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  productOptions?: string[];
}

export default function ContactModal({
  isOpen,
  onClose,
  productOptions,
}: ContactModalProps) {
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
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                Get a Quote
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
            <div className="rounded-2xl bg-white/80 p-6 flex-1 overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm">
                Fill in your details below and we&apos;ll get back to you within
                24 hours.
              </p>
              <ContactForm productOptions={productOptions} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
