"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ServiceOffered } from "~/sanity/lib/serviceTypes";
import ServiceCard from "./ServiceCard";

// Lazy loading hook
function useIntersectionObserver(
  elementRef: React.RefObject<HTMLDivElement | null>,
  threshold = 0.1,
  triggerOnce = false,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (triggerOnce && isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, threshold, triggerOnce, hasIntersected]);

  return triggerOnce ? hasIntersected : isIntersecting;
}

// Service card component with lazy loading
function LazyServiceCard({
  service,
  index,
}: {
  service: ServiceOffered;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLoaded = useIntersectionObserver(cardRef, 0.1, true);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isLoaded ? (
        <ServiceCard
          title={service.title}
          summary={service.summary}
          tags={service.tags}
          serviceId={service.slug}
          featured={service.featured}
          imageSrc={service.image}
          imageAlt={service.imageAlt}
        />
      ) : (
        // Loading skeleton
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg h-80">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface ServicesGridProps {
  services: ServiceOffered[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-12 md:py-16 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Featured Services */}
        {services.some((service) => service.featured) && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Featured Services
                </span>
              </div>
              <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
                Our Most Popular Services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {services
                .filter((service) => service.featured)
                .map((service, index) => (
                  <LazyServiceCard
                    key={service._id}
                    service={service}
                    index={index}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            {services.some((service) => service.featured)
              ? "All Services"
              : "Our Services"}
          </h2>
          <p className="text-gray-600 mt-2">
            Comprehensive elevator solutions for every need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <LazyServiceCard
              key={service._id}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Empty state */}
        {services.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              Services will appear here once they&apos;re added to the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
