"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import type { Product } from "~/sanity/lib/productTypes";

type ProductCarouselProps = {
  products: Product[];
  title?: string;
  description?: string;
  showAutoRotate?: boolean;
  mobileGrid?: boolean; // Show grid layout on mobile instead of carousel
};

const AUTO_ROTATE_MS = 5000;

export default function ProductCarousel({
  products,
  title,
  description,
  showAutoRotate = false,
  mobileGrid = false,
}: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (products.length <= 1 || isDragging || !showAutoRotate) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % products.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [products.length, isDragging, showAutoRotate]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    setIsDragging(false);
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold) {
      // Swiped right - go to previous
      setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped left - go to next
      setActiveIndex((prev) => (prev + 1) % products.length);
    }
  };

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[activeIndex];

  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          )}
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
      )}

      {/* Mobile View - Carousel or Grid based on mobileGrid prop */}
      {mobileGrid ? (
        /* Mobile Grid - All Products */
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
              summary={product.description}
              tags={product.tags?.map((tag) => tag.title) || []}
              productId={product.slug}
              badge={product.featured ? "Featured" : undefined}
              imageSrc={product.mainImage}
              imageAlt={product.imageAlt}
              blurDataURL={product.mainImageLqip}
            />
          ))}
        </div>
      ) : (
        /* Mobile Carousel - Single Product */
        <div className="md:hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${currentProduct._id}-${activeIndex}`}
              initial={{ opacity: 0, x: 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -44 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              className="touch-pan-y"
            >
              <ProductCard
                title={currentProduct.title}
                summary={currentProduct.description}
                tags={currentProduct.tags?.map((tag) => tag.title) || []}
                productId={currentProduct.slug}
                badge={currentProduct.featured ? "Featured" : undefined}
                imageSrc={currentProduct.mainImage}
                imageAlt={currentProduct.imageAlt}
                blurDataURL={currentProduct.mainImageLqip}
              />
            </motion.div>
          </AnimatePresence>

          <CarouselDots
            activeIndex={activeIndex}
            total={products.length}
            onSelect={setActiveIndex}
          />
        </div>
      )}

      {/* Desktop Grid - All Products */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            summary={product.description}
            tags={product.tags?.map((tag) => tag.title) || []}
            productId={product.slug}
            badge={product.featured ? "Featured" : undefined}
            imageSrc={product.mainImage}
            imageAlt={product.imageAlt}
            blurDataURL={product.mainImageLqip}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselDots({
  activeIndex,
  total,
  onSelect,
}: {
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mx-auto mt-6 flex w-full justify-center gap-2" aria-hidden>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={`dot-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 ${
            index === activeIndex
              ? "bg-accent scale-110"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Show product ${index + 1}`}
          aria-pressed={index === activeIndex}
        />
      ))}
    </div>
  );
}
