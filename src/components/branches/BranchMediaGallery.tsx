"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { HiXMark } from "react-icons/hi2";
import type { BranchMediaItem } from "~/sanity/lib/branchTypes";

interface BranchMediaGalleryProps {
  mediaItems: BranchMediaItem[];
}

export default function BranchMediaGallery({
  mediaItems,
}: BranchMediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<BranchMediaItem | null>(
    null
  );

  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Branch Gallery
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedMedia(item)}
              className="group cursor-pointer"
            >
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                {item.type === "image" && item.image ? (
                  <Image
                    src={item.image.asset.url}
                    alt={item.image.alt || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : item.youtubeUrl ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="text-4xl text-white">▶</div>
                  </div>
                ) : null}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Close media"
              >
                <HiXMark className="w-6 h-6" />
              </button>

              {/* Media Content */}
              {selectedMedia.type === "image" && selectedMedia.image ? (
                <div className="relative w-full h-auto max-h-[80vh]">
                  <Image
                    src={selectedMedia.image.asset.url}
                    alt={selectedMedia.image.alt || selectedMedia.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              ) : selectedMedia.youtubeUrl ? (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedMedia.youtubeUrl.replace(
                      /watch\?v=/,
                      "embed/"
                    )}
                    title={selectedMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : null}

              {/* Media Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {selectedMedia.title}
                </h3>
                {selectedMedia.description && (
                  <p className="text-gray-600">{selectedMedia.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
