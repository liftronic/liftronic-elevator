"use client";
import { useState, useEffect } from "react";
import ContactModal from "~/components/ContactModal";
import { useModal } from "~/contexts/ModalContext";

interface ContactModalAutoOpenProps {
  productOptions?: string[];
}

export default function ContactModalAutoOpen({
  productOptions,
}: ContactModalAutoOpenProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const { isAnyModalOpen, isUserTyping } = useModal();

  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasShown = sessionStorage.getItem("contactModalAutoOpened");

    if (hasShown || hasAutoOpened) {
      return;
    }

    // Auto-open after 30 seconds (30000ms)
    const timer = setTimeout(() => {
      // Only auto-open if:
      // 1. No other modal is currently open
      // 2. User is not actively typing in any form
      if (!isAnyModalOpen && !isUserTyping) {
        setIsContactModalOpen(true);
        setHasAutoOpened(true);
        sessionStorage.setItem("contactModalAutoOpened", "true");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened, isAnyModalOpen, isUserTyping]);

  const handleClose = () => {
    setIsContactModalOpen(false);
  };

  return (
    <ContactModal
      isOpen={isContactModalOpen}
      onClose={handleClose}
      productOptions={productOptions}
    />
  );
}
