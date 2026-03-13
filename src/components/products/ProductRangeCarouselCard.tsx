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
  index?: number;
};

export default function ProductRangeCarouselCard({
  title,
  description,
  slug,
  featured,
  products,
  index = 0,
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
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(idx);
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

  // ─── Single product: render as a standalone card that fills its grid cell ───
  if (products.length === 1) {
    const product = products[0];
    return (
      <motion.div
        id={slug}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
        viewport={{ once: true, margin: "-60px" }}
        className="h-full"
      >
        <ProductMiniCard
          title={product.title}
          description={product.subtitle || product.description}
          slug={product.slug}
          imageSrc={product.mainImage}
          imageAlt={product.imageAlt}
          blurDataURL={product.mainImageLqip}
          featured={product.featured}
          rangeTitle={title}
        />
      </motion.div>
    );
  }

  // ─── Multiple products: carousel layout spanning full width ───
  return (
    <motion.section
      id={slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Header Row: title + description on left, arrows on right */}
      <div className="flex items-end justify-between gap-6 mb-6 md:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-tight">
              {title}
            </h2>
            {featured && (
              <span className="inline-flex items-center rounded-md bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl line-clamp-2">
            {description}
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        {products.length > visibleProducts && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 cursor-pointer"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Previous products"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 cursor-pointer"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Next products"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

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
        <div className="flex gap-5 md:gap-6">
          {products.map((product, productIndex) => (
            <motion.div
              key={product._id}
              className="flex-shrink-0 snap-start w-[85%] sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: productIndex * 0.08 }}
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

      {/* Dot Indicators — mobile/tablet only */}
      {products.length > 1 && (
        <div className="flex lg:hidden justify-center gap-1.5 mt-5">
          {Array.from({ length: totalDots }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                const container = scrollContainerRef.current;
                const cardWidth =
                  container.querySelector("article")?.clientWidth || 0;
                const gap = 24;
                container.scrollTo({
                  left: dotIndex * (cardWidth + gap),
                  behavior: "smooth",
                });
              }}
              className={`rounded-full transition-all duration-300 ${
                dotIndex === currentIndex
                  ? "w-6 h-1.5 bg-gray-900"
                  : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to product ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
}
