"use client";
import { useState, useEffect } from "react";
import ContactModal from "~/components/ContactModal";

export default function ContactModalAutoOpen() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    // Check if modal has already been shown in this session
    const hasShown = sessionStorage.getItem("contactModalAutoOpened");

    if (hasShown || hasAutoOpened) {
      return;
    }

    // Auto-open after 2 minutes (120000ms)
    const timer = setTimeout(() => {
      setIsContactModalOpen(true);
      setHasAutoOpened(true);
      sessionStorage.setItem("contactModalAutoOpened", "true");
    }, 120000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  const handleClose = () => {
    setIsContactModalOpen(false);
  };

  return (
    <ContactModal
      isOpen={isContactModalOpen}
      onClose={handleClose}
    />
  );
}
