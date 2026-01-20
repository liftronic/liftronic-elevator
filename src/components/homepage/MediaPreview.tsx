"use client";

import { useState } from "react";
import { motion } from "motion/react";
import QuoteCTA from "~/components/QuoteCTA";
import MediaCard from "~/components/media/MediaCard";
import MediaPreviewModal from "~/components/media/MediaPreview";
import type { MediaItem } from "~/sanity/lib/mediaTypes";

interface MediaPreviewSectionProps {
  mediaItems: MediaItem[];
}

export default function MediaPreviewSection({
  mediaItems,
}: MediaPreviewSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleNext = () => {
    if (!selectedMedia || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(
      (item) => item._id === selectedMedia._id
    );
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setSelectedMedia(mediaItems[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedMedia || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex(
      (item) => item._id === selectedMedia._id
    );
    const previousIndex =
      (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setSelectedMedia(mediaItems[previousIndex]);
  };

  if (mediaItems.length === 0) return null;

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
          {mediaItems.slice(0, 3).map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <MediaCard item={item} onClick={() => setSelectedMedia(item)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Quote and CTA Section */}
        <QuoteCTA
          quote="Every project tells a story of innovation and excellence."
          ctaText="Explore Full Media Gallery"
          ctaHref="/media"
        />
      </div>

      {/* Media Preview Modal */}
      <MediaPreviewModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasMultiple={mediaItems.length > 1}
      />
    </section>
  );
}
