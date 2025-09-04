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
  index?: number;
  imageSrc?: string;
  imageAlt?: string;
};

function PlaceholderArt({
  label,
  index = 0,
}: {
  label: string;
  index?: number;
}) {
  // Subtle gradient variants to avoid same look for all cards
  const gradients = [
    "from-gray-100 to-gray-200",
    "from-emerald-50 to-gray-100",
    "from-slate-50 to-gray-200",
    "from-teal-50 to-gray-100",
    "from-zinc-50 to-gray-200",
  ];
  const g = gradients[index % gradients.length];
  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${g}`}>
      {/* Minimal elevator illustration */}
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="w-full h-full"
        role="img"
      >
        <defs>
          <linearGradient id="door" x1="0" x2="1">
            <stop offset="0%" stopColor="#e7e7e7" />
            <stop offset="100%" stopColor="#f5f5f5" />
          </linearGradient>
        </defs>
        {/* Frame */}
        <rect
          x="40"
          y="30"
          width="320"
          height="240"
          rx="14"
          fill="#ffffff"
          stroke="#e5e7eb"
        />
        {/* Indicator */}
        <circle cx="340" cy="50" r="6" fill="#2ae394" />
        {/* Doors */}
        <rect
          x="70"
          y="60"
          width="120"
          height="180"
          fill="url(#door)"
          stroke="#e5e7eb"
        />
        <rect
          x="210"
          y="60"
          width="120"
          height="180"
          fill="url(#door)"
          stroke="#e5e7eb"
        />
        {/* Door gap */}
        <rect x="198" y="60" width="4" height="180" fill="#d1d5db" />
        {/* Floor */}
        <rect x="60" y="240" width="280" height="8" fill="#e5e7eb" />
        {/* Label */}
        <text x="50%" y="290" textAnchor="middle" fontSize="14" fill="#9ca3af">
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function ProductCard({
  title,
  summary,
  tags = [],
  href,
  productId,
  badge,
  index = 0,
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

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white border border-black/10 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        productId ? "product-card cursor-pointer" : ""
      }`}
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
    >
      {!!badge && (
        <span className="absolute left-3 top-3 z-10 rounded px-2 py-1 text-[11px] font-semibold bg-accent text-black">
          {badge}
        </span>
      )}
      <div
        className={`relative aspect-[4/3] ${productId ? "product-image" : ""}`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <PlaceholderArt label="Product image" index={index} />
        )}
      </div>
      <div className="p-5">
        <h3
          className={`text-lg font-semibold tracking-tight ${
            productId ? "product-title" : ""
          }`}
        >
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{summary}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs rounded-full bg-soft border border-black/5 px-2.5 py-1 text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          {productId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(productHref);
              }}
              className="btn btn-primary h-9 px-3 text-sm"
            >
              Learn More
            </button>
          ) : (
            <Link
              href={productHref}
              className="btn btn-primary h-9 px-3 text-sm"
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
              className="text-sm text-accent transition-transform group-hover:translate-x-0.5"
            >
              View Details →
            </button>
          ) : (
            <Link
              href={productHref}
              className="text-sm text-accent transition-transform group-hover:translate-x-0.5"
            >
              Learn more →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
