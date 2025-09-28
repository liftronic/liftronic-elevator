"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { HiPlay, HiPhotograph, HiArrowRight } from "react-icons/hi";

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

export default function MediaPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50/30 via-white to-blue-50/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              Media Gallery
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl mb-6">
            See Our Work in Action
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Explore our latest projects, installations, and product showcases
            through our comprehensive media gallery.
          </p>
        </motion.div>

        {/* Featured Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/media">
            <motion.button
              className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiPhotograph className="w-5 h-5" />
              Explore Full Media Gallery
              <HiArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "150+", label: "Project Photos" },
            { number: "25+", label: "Installation Videos" },
            { number: "50+", label: "Product Showcases" },
            { number: "100+", label: "Service Updates" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
