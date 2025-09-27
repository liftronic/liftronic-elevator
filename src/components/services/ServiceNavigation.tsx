// components/ServiceNavigation.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

type ServiceNavProps = {
  services: Array<{
    id: string;
    title: string;
    icon: string;
    shortTitle?: string;
  }>;
  activeService: string;
  onServiceChange: (serviceId: string) => void;
  currentIndex: number;
};

export default function ServiceNavigation({
  services,
  activeService,
  onServiceChange,
  currentIndex,
}: ServiceNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextService = () => {
    const nextIndex = (currentIndex + 1) % services.length;
    onServiceChange(services[nextIndex].id);
  };

  const prevService = () => {
    const prevIndex =
      currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    onServiceChange(services[prevIndex].id);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="sticky top-20 z-40 bg-gradient-to-r from-white/95 via-white/98 to-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg mb-8">
      <div className="container mx-auto px-6">
        {/* Modern Navigation Controls */}
        <div className="flex items-center justify-between py-6">
          {/* Navigation Arrows */}
          <button
            onClick={prevService}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
          >
            <BiChevronLeft className="text-2xl text-gray-600 group-hover:text-accent transition-colors" />
          </button>

          {/* Service Tabs with Modern Pills */}
          <div
            className="flex items-center space-x-2 overflow-x-auto scrollbar-hide max-w-3xl mx-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => onServiceChange(service.id)}
                className="relative flex items-center space-x-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active Background */}
                {activeService === service.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Content */}
                <div className="relative flex items-center space-x-3">
                  <span
                    className={`text-2xl transition-all duration-300 ${
                      activeService === service.id
                        ? "text-white scale-110"
                        : "text-gray-600 group-hover:text-accent group-hover:scale-105"
                    }`}
                  >
                    {service.icon}
                  </span>
                  <span
                    className={`font-semibold text-sm md:text-base transition-all duration-300 ${
                      activeService === service.id
                        ? "text-white"
                        : "text-gray-700 group-hover:text-accent"
                    }`}
                  >
                    {service.shortTitle || service.title}
                  </span>
                </div>

                {/* Hover Effect */}
                {activeService !== service.id && (
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation Arrow Right */}
          <button
            onClick={nextService}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
          >
            <BiChevronRight className="text-2xl text-gray-600 group-hover:text-accent transition-colors" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 pb-4">
          {services.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-gray-300 hover:bg-accent/50"
              }`}
              onClick={() => onServiceChange(services[index].id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
