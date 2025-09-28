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
}: ServiceCardProps) {
  const serviceHref =
    href || (serviceId ? `/services/${serviceId}` : "/#contact");
  const { transitionTo } = useViewTransition();
  const router = useRouter();

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

  // Use the specified service image or fallback to illustration
  const finalImageSrc = imageSrc || "/illustrations/lift02.png";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        serviceId ? "service-card cursor-pointer" : ""
      }`}
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
        className={`relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 ${
          serviceId ? "service-image" : ""
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
      <div className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3
              className={`text-xl font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-gray-800 transition-colors ${
                serviceId ? "service-title" : ""
              }`}
            >
              {title}
            </h3>
            <p className="mt-3 text-gray-600 leading-relaxed text-sm line-clamp-3">
              {summary}
            </p>
          </div>

          {/* Tags section with improved styling */}
          {tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                    +{tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action area with hover effect */}
        <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
          <div className="inline-flex items-center text-sm font-medium text-gray-500 transition-all hover:text-accent group-hover:translate-x-1">
            <span className="text-sm font-medium">
              {serviceId ? "Learn more" : "Get quote"}
            </span>
            <svg
              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
