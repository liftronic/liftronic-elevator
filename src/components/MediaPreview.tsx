"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { HiPlay, HiPhotograph, HiArrowRight } from "react-icons/hi";
import AnimatedNumbers from "~/components/AnimatedNumbers";
import QuoteCTA from "~/components/QuoteCTA";

// Featured media items for homepage preview
const featuredMedia = [
  {
    id: "1",
    type: "video" as const,
    title: "Modern Passenger Elevator Installation",
    src: "/assets/sample_1.mp4",
    thumbnail: "/illustrations/product01.png",
  },
  {
    id: "2",
    type: "image" as const,
    title: "Luxury Elevator Cabin Design",
    src: "/illustrations/lift01.png",
    thumbnail: "/illustrations/lift01.png",
  },
  {
    id: "3",
    type: "image" as const,
    title: "Glass Elevator Shaft",
    src: "/illustrations/lift02.png",
    thumbnail: "/illustrations/lift02.png",
  },
];

// Statistics data for animated numbers
const mediaStats = [
  { number: 150, suffix: "+", label: "Project Photos" },
  { number: 25, suffix: "+", label: "Installation Videos" },
  { number: 50, suffix: "+", label: "Product Showcases" },
  { number: 100, suffix: "+", label: "Service Updates" },
];

export default function MediaPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="media" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header section matching BlogSection typography */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Our Work in Action
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Explore our latest projects, installations, and product showcases
            through our comprehensive media gallery featuring real-world
            implementations.
          </p>
        </motion.div>

        {/* Media Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {featuredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Media Preview */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Play button for videos */}
                {item.type === "video" && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <HiPlay className="w-8 h-8 text-accent ml-1" />
                    </div>
                  </div>
                )}

                {/* Media type badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      item.type === "video"
                        ? "bg-red-500/90 text-white"
                        : "bg-blue-500/90 text-white"
                    }`}
                  >
                    {item.type === "video" ? (
                      <HiPlay className="w-3 h-3" />
                    ) : (
                      <HiPhotograph className="w-3 h-3" />
                    )}
                    {item.type === "video" ? "Video" : "Photo"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                  <span>View Details</span>
                  <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote and CTA Section */}
        <QuoteCTA
          quote="Every project tells a story of innovation and excellence."
          ctaText="Explore Full Media Gallery"
          ctaHref="/media"
        />

        {/* Animated Numbers Section */}
        <AnimatedNumbers stats={mediaStats} />
      </div>
    </section>
  );
}
