"use client";
import { useState } from "react";
import CatalogModal from "./CatalogModal";

export default function DownloadCatalogButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center bg-brand gap-3 px-3 py-3 text-white rounded-l-lg shadow-lg hover:shadow-xl hover:px-4 transition-all duration-300 font-medium"
        aria-label="Download Catalog"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-sm tracking-wide">Download Catalog</span>
      </button>

      <CatalogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
