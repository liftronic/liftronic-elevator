"use client";
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function RequestQuoteButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-1/2 z-40 flex items-center bg-brand gap-3 px-3 py-3 text-white rounded-l-lg shadow-lg hover:shadow-xl hover:px-4 transition-all duration-300 font-medium"
        aria-label="Request a Quote"
        style={{ writingMode: "vertical-rl", transform: "translateY(10px)" }}
      >
        <span className="text-sm tracking-wide">Request a Quote</span>
      </button>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
