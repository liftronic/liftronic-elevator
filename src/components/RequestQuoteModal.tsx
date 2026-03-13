"use client";

import { motion, AnimatePresence } from "motion/react";
import { FiX } from "react-icons/fi";
import ContactForm from "~/components/ContactForm";
import { useModal } from "~/hooks/useModal";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productOptions: string[];
  title?: string;
  subtitle?: string;
}

export default function RequestQuoteModal({
  isOpen,
  onClose,
  productOptions,
  title,
  subtitle,
}: RequestQuoteModalProps) {

  useModal({ isOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
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

          {/* Modal panel */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {title || "Request a Quote"}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  {subtitle ||
                    "Fill in your details and our team will get back to you shortly."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Scrollable form area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ContactForm productOptions={productOptions} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
