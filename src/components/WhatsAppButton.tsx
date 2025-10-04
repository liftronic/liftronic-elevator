"use client";

import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

interface WhatsAppButtonProps {
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function WhatsAppButton({
  whatsappNumber,
  whatsappMessage,
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback values if not provided from CMS
  const defaultNumber = "919876543210";
  const defaultMessage =
    "Hello! I'm interested in Liftronic Elevator services.";

  const phoneNumber = whatsappNumber || defaultNumber;
  const message = encodeURIComponent(whatsappMessage || defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1,
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse animation ring */}
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main button */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
        <FaWhatsapp className="text-white text-3xl md:text-4xl" />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : 10,
        }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-charcoal text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none"
      >
        <span className="text-sm font-medium">Chat with us on WhatsApp</span>
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-charcoal" />
        </div>
      </motion.div>
    </motion.a>
  );
}
