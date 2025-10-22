"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ProductMiniCard from "./ProductMiniCard";
import type { Product } from "~/sanity/lib/productTypes";

type ProductRangeCarouselCardProps = {
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  products: Product[];
};

export default function ProductRangeCarouselCard({
  title,
  description,
  slug,
  featured,
  products,
}: ProductRangeCarouselCardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(1);

  // Check scroll position to enable/disable arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate current index based on scroll position
    const cardWidth =
      scrollContainerRef.current.querySelector("article")?.clientWidth || 0;
    const gap = 24; // gap-6 = 24px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(index);
  };

  useEffect(() => {
    checkScrollPosition();

    // Update visible products based on viewport width
    const updateVisibleProducts = () => {
      if (window.innerWidth >= 1024) {
        setVisibleProducts(3);
      } else if (window.innerWidth >= 768) {
        setVisibleProducts(2);
      } else {
        setVisibleProducts(1);
      }
    };

    updateVisibleProducts();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScrollPosition);
      window.addEventListener("resize", updateVisibleProducts);
      return () => {
        window.removeEventListener("resize", checkScrollPosition);
        window.removeEventListener("resize", updateVisibleProducts);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector("article")?.clientWidth || 0;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const totalDots = products.length;

  return (
    <section id={slug} className="relative">
      {/* Content */}
      <div className="relative bg-white rounded-2xl border border-gray-200/80 shadow-lg shadow-gray-200/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50">
        {/* Header */}
        <div className="mb-8">
          {featured && (
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Featured Range
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {products.length > visibleProducts && (
            <>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-4 md:-ml-6 w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? "hover:bg-accent hover:border-accent hover:scale-110 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                aria-label="Previous products"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-4 md:-mr-6 w-12 h-12 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? "hover:bg-accent hover:border-accent hover:scale-110 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                aria-label="Next products"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Scrollable Products Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              className={`flex gap-6 pb-2 ${products.length === 1 ? "justify-start" : ""}`}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  className={`flex-shrink-0 snap-start ${
                    products.length === 1
                      ? "w-full"
                      : "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductMiniCard
                    title={product.title}
                    description={product.subtitle || product.description}
                    slug={product.slug}
                    imageSrc={product.mainImage}
                    imageAlt={product.imageAlt}
                    blurDataURL={product.mainImageLqip}
                    featured={product.featured}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dot Indicators - Hidden on desktop (lg+), visible on mobile/tablet when >1 product */}
          {products.length > 1 && (
            <div className="flex lg:hidden justify-center gap-2 mt-6">
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!scrollContainerRef.current) return;
                    const container = scrollContainerRef.current;
                    const cardWidth =
                      container.querySelector("article")?.clientWidth || 0;
                    const gap = 24;
                    container.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: "smooth",
                    });
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
