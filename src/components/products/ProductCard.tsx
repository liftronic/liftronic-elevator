"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useViewTransition } from "~/hooks/useViewTransition";

type ProductCardProps = {
  title: string;
  summary: string;
  tags?: string[];
  href?: string;
  productId?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ProductCard({
  title,
  summary,
  tags = [],
  href,
  productId,
  badge,
  imageSrc,
  imageAlt,
}: ProductCardProps) {
  const productHref =
    href || (productId ? `/products/${productId}` : "/#contact");
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger view transition for product pages, not contact links
    if (productId) {
      e.preventDefault();
      transitionTo(productHref);
    }
  };

  const handleMouseEnter = useCallback(() => {
    // Prefetch the product page on hover for faster navigation
    if (productId) {
      router.prefetch(productHref);
    }
  }, [productId, productHref, router]);

  const cardStyle = productId
    ? ({
        "--transition-name": `product-card-${productId}`,
        "--image-transition-name": `product-image-${productId}`,
        "--title-transition-name": `product-title-${productId}`,
      } as React.CSSProperties)
    : {};

  // Use the specified product image or fallback to placeholder
  const finalImageSrc = imageSrc || "/illustrations/product01.png";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        productId ? "product-card cursor-pointer" : ""
      } flex flex-col h-full`}
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
    >
      {!!badge && (
        <div className="absolute right-3 top-3 z-10">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-black shadow-sm">
            {badge}
          </span>
        </div>
      )}

      {/* Image Container with better aspect ratio and styling */}
      <div
        className={`relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
          productId ? "product-image" : ""
        }`}
      >
        <Image
          src={finalImageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content with better spacing and typography */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-grow">
          <h3
            className={`text-xl font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-gray-800 transition-colors ${
              productId ? "product-title" : ""
            }`}
          >
            {title}
          </h3>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {summary}
          </p>

          {/* Tags with improved styling */}
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action area with better alignment */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 flex-shrink-0">
          {productId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(productHref);
              }}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Learn More
            </button>
          ) : (
            <Link
              href={productHref}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Enquire
            </Link>
          )}

          {productId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(productHref);
              }}
              className="inline-flex items-center text-sm font-medium text-gray-500 transition-all hover:text-accent group-hover:translate-x-1"
            >
              View Details
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          ) : (
            <Link
              href={productHref}
              className="inline-flex items-center text-sm font-medium text-gray-500 transition-all hover:text-accent group-hover:translate-x-1"
            >
              Learn more
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
