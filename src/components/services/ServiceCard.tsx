"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useViewTransition } from "~/hooks/useViewTransition";

type ServiceCardProps = {
  title: string;
  summary: string;
  tags?: string[];
  href?: string;
  serviceId?: string;
  badge?: string;
  imageSrc?: string;
  imageAlt?: string;
  blurDataURL?: string;
  featured?: boolean;
};

export default function ServiceCard({
  title,
  summary,
  tags = [],
  href,
  serviceId,
  badge,
  imageSrc,
  imageAlt,
  blurDataURL,
  featured,
}: ServiceCardProps) {
  const serviceHref =
    href || (serviceId ? `/services/${serviceId}` : "/#contact");
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  // Determine the badge to display
  const displayBadge = featured ? "Featured" : badge;

  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger view transition for service pages, not contact links
    if (serviceId) {
      e.preventDefault();
      transitionTo(serviceHref);
    }
  };

  const handleMouseEnter = useCallback(() => {
    // Prefetch the service page on hover for faster navigation
    if (serviceId) {
      router.prefetch(serviceHref);
    }
  }, [serviceId, serviceHref, router]);

  const cardStyle = serviceId
    ? ({
        "--transition-name": `service-card-${serviceId}`,
        "--image-transition-name": `service-image-${serviceId}`,
        "--title-transition-name": `service-title-${serviceId}`,
      } as React.CSSProperties)
    : {};

  // Use the specified service image or fallback to placeholder
  const finalImageSrc = imageSrc || "/illustrations/lift02.png";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        serviceId ? "service-card cursor-pointer" : ""
      } flex flex-col h-full`}
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
    >
      {!!displayBadge && (
        <div className="absolute right-3 top-3 z-10">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-black shadow-sm ${
              featured ? "bg-accent" : "bg-gray-100"
            }`}
          >
            {displayBadge}
          </span>
        </div>
      )}

      {/* Image Container with better aspect ratio and styling */}
      <div
        className={`relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
          serviceId ? "service-image" : ""
        }`}
      >
        <Image
          src={finalImageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content with better spacing and typography */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-grow">
          <h3
            className={`text-xl font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-gray-800 transition-colors ${
              serviceId ? "service-title" : ""
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
          {serviceId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(serviceHref);
              }}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Learn More
            </button>
          ) : (
            <Link
              href={serviceHref}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Get Quote
            </Link>
          )}

          {serviceId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(serviceHref);
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
              href={serviceHref}
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
