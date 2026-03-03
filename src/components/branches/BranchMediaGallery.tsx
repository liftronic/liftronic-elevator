"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { BranchMediaItem } from "~/sanity/lib/branchTypes";
import ProductGalleryModal from "~/components/products/ProductGalleryModal";
import type { GalleryImage } from "~/sanity/lib/productTypes";

interface BranchMediaGalleryProps {
  mediaItems: BranchMediaItem[];
  bgVariant?: "white" | "soft";
}

export default function BranchMediaGallery({
  mediaItems,
  bgVariant = "white",
}: BranchMediaGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  const imageItems = mediaItems.filter(
    (item) => item.type === "image" && item.image?.asset?.url,
  );

  if (imageItems.length === 0) {
    return null;
  }

  const galleryImages: GalleryImage[] = imageItems.map((item, index) => ({
    _key: `${item.title}-${index}`,
    url: item.image!.asset.url,
    alt: item.image?.alt || item.title,
  }));

  const handleNext = () => {
    if (selectedImageIndex === null || galleryImages.length <= 1) return;
    setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
  };

  const handlePrevious = () => {
    if (selectedImageIndex === null || galleryImages.length <= 1) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <section
      className={`bg-${bgVariant} py-10 md:py-16`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl">
            Highlights from our branch
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            A visual showcase of installations, spaces, and project moments
            from this branch.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 auto-rows-[200px] md:grid-cols-4 md:auto-rows-[280px]">
          {imageItems.map((item, index) => {
            const bentoPatterns = [
              "col-span-2 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-1 row-span-1",
              "col-span-2 row-span-1",
            ];
            const pattern = bentoPatterns[index % bentoPatterns.length];

            return (
              <motion.button
                key={`${item.title}-${index}`}
                type="button"
                className={`group relative overflow-hidden rounded-2xl border border-black/10 shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer ${pattern}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`Open ${item.image?.alt || item.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Image
                  src={item.image!.asset.url}
                  alt={item.image?.alt || item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-sm md:text-lg font-semibold text-white drop-shadow-lg line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-xs md:text-sm text-white/85 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ProductGalleryModal
          images={galleryImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          productTitle="Branch Highlights"
        />
      )}
    </section>
  );
}
