"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

type ProductMiniCardProps = {
  title: string;
  description: string;
  slug: string;
  imageSrc?: string;
  imageAlt?: string;
  blurDataURL?: string;
  featured?: boolean;
};

export default function ProductMiniCard({
  title,
  description,
  slug,
  imageSrc,
  imageAlt,
  blurDataURL,
  featured = false,
}: ProductMiniCardProps) {
  const finalImageSrc = imageSrc || "/illustrations/product01.png";
  const finalImageAlt = imageAlt || `${title} - Product image`;

  return (
    <Link href={`/products/${slug}`} className="block h-full">
      <motion.article
        className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {featured && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-black shadow-sm">
              Featured
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={finalImageSrc}
            alt={finalImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 350px, 100vw"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* View Details Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="inline-flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
              View Details
              <svg
                className="ml-1.5 h-4 w-4"
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
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
