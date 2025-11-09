"use client";
import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import { useModal } from "~/contexts/ModalContext";

interface RequestQuoteButtonProps {
  productOptions?: string[];
}

export default function RequestQuoteButton({
  productOptions,
}: RequestQuoteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setModalOpen } = useModal();

  // Notify context when modal state changes
  useEffect(() => {
    setModalOpen(isModalOpen);
  }, [isModalOpen, setModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center bg-brand gap-3 px-3 py-3 text-white rounded-l-lg shadow-lg hover:shadow-xl hover:px-4 transition-all duration-300 font-medium"
        aria-label="Request a Quote"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-sm tracking-wide">Request a Quote</span>
      </button>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productOptions={productOptions}
      />
    </>
  );
}
