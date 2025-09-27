// components/ServiceCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  BiCheck,
  BiPhone,
  BiMailSend,
  BiArrowToRight,
  BiPlay,
} from "react-icons/bi";

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageSrc: string;
  imageAlt: string;
  icon: string;
  features?: string[];
  benefits?: string[];
  stats?: { label: string; value: string }[];
};

type ServiceCarouselProps = {
  services: ServiceDetail[];
  activeService: string;
  onServiceChange: (serviceId: string) => void;
};

export default function ServiceCarousel({
  services,
  activeService,
  onServiceChange,
}: ServiceCarouselProps) {
  const [direction, setDirection] = useState(0);
  const activeServiceData = services.find(
    (service) => service.id === activeService
  );
  const currentIndex = services.findIndex(
    (service) => service.id === activeService
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!activeServiceData) return null;

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeService}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              const nextIndex = (currentIndex + 1) % services.length;
              setDirection(1);
              onServiceChange(services[nextIndex].id);
            } else if (swipe > swipeConfidenceThreshold) {
              const prevIndex =
                currentIndex === 0 ? services.length - 1 : currentIndex - 1;
              setDirection(-1);
              onServiceChange(services[prevIndex].id);
            }
          }}
          className="w-full"
        >
          {/* Modern Service Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Image Section with Modern Overlay */}
              <div className="relative h-64 lg:h-full">
                <Image
                  src={activeServiceData.imageSrc}
                  alt={activeServiceData.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

                {/* Floating Icon Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  className="absolute top-6 left-6 w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-3xl">{activeServiceData.icon}</span>
                </motion.div>

                {/* Stats Overlay */}
                {activeServiceData.stats && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="grid grid-cols-2 gap-4">
                      {activeServiceData.stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center"
                        >
                          <div className="text-white font-bold text-lg">
                            {stat.value}
                          </div>
                          <div className="text-white/80 text-sm">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-accent font-semibold text-sm uppercase tracking-wide">
                      Service #{String(currentIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4 leading-tight">
                    {activeServiceData.title}
                  </h2>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {activeServiceData.description}
                  </p>
                </motion.div>

                {/* Enhanced Key Points */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
                    <BiPlay className="text-accent mr-2" />
                    What&apos;s Included:
                  </h3>

                  <div className="grid gap-3">
                    {activeServiceData.bulletPoints
                      .slice(0, 4)
                      .map((point, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-start space-x-3 group"
                        >
                          <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-accent/20 transition-colors">
                            <BiCheck className="text-accent text-sm" />
                          </div>
                          <span className="text-gray-700 group-hover:text-charcoal transition-colors">
                            {point}
                          </span>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                {/* Features Tags */}
                {activeServiceData.features && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="flex flex-wrap gap-2">
                      {activeServiceData.features.map((feature, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.6 + idx * 0.05,
                            type: "spring",
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent rounded-full text-sm font-medium border border-accent/20 hover:border-accent/40 transition-colors"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="btn btn-primary flex items-center justify-center space-x-2 group">
                    <BiPhone className="text-lg group-hover:animate-pulse" />
                    <span>Get Free Quote</span>
                    <BiArrowToRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="btn bg-gray-100 text-charcoal hover:bg-gray-200 flex items-center justify-center space-x-2 border border-gray-200 hover:border-gray-300">
                    <BiMailSend className="text-lg" />
                    <span>Learn More</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Swipe Indicator */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
          <span>←</span>
          <span>Swipe or use navigation to explore services</span>
          <span>→</span>
        </p>
      </div>
    </div>
  );
}
