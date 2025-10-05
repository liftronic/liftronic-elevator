"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "~/components/products/ProductCard";
import QuoteCTA from "~/components/QuoteCTA";
import type { Product } from "~/sanity/lib/productTypes";

interface ProductsInteractiveProps {
  products: Product[];
}

export default function ProductsInteractive({
  products,
}: ProductsInteractiveProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate products every 8 seconds
  useEffect(() => {
    if (isAutoRotating && products.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, products.length]);

  // Handle manual interaction
  const handleInteraction = () => {
    setIsAutoRotating(false);
    // Resume auto-rotation after 20 seconds of inactivity
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 20000);
  };

  // Get up to 3 visible products starting from currentIndex
  // Ensure we don't show duplicate products if there are fewer than 3 products
  const getVisibleProducts = () => {
    const visible = [];
    const maxVisible = Math.min(3, products.length);
    for (let i = 0; i < maxVisible; i++) {
      visible.push(products[(currentIndex + i) % products.length]);
    }
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <section id="products" className="py-20 bg-white">
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
            Our Products
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Discover our comprehensive range of elevator solutions designed for
            safety, efficiency, and modern architecture. Each product represents
            the pinnacle of engineering excellence.
          </p>
        </motion.div>

        {/* Products Cards Grid - matching BlogSection layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
                onMouseEnter={handleInteraction}
                onClick={handleInteraction}
              >
                <ProductCard
                  title={product.title}
                  summary={product.description}
                  tags={product.tags?.map((tag) => tag.title) || []}
                  productId={product.slug}
                  badge={product.featured ? "Featured" : undefined}
                  imageSrc={product.mainImage}
                  imageAlt={product.imageAlt}
                  blurDataURL={product.mainImageLqip}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Carousel Dots - matching Services section */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  handleInteraction();
                }}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  index === currentIndex
                    ? "bg-accent scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Show products starting from ${products[index].title}`}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>
        </motion.div>

        {/* Quote and CTA Section */}
        <QuoteCTA
          quote="Quality and reliability built into every installation."
          ctaText="See All Products"
          ctaHref="/products"
          onClick={handleInteraction}
        />
      </div>
    </section>
  );
}
