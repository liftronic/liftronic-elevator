// app/(main)/services/page.tsx

import * as motion from "motion/react-client";
import Link from "next/link";
import Breadcrumb from "~/components/Breadcrumb";
import ServiceCard from "~/components/services/ServiceCard";
import CallToActionSection from "~/components/CallToActionSection";
import { FiMessageSquare, FiEye } from "react-icons/fi";
import { getServices } from "~/sanity/utils/getServices";
import { ServiceOffered } from "~/sanity/lib/serviceTypes";

export default async function ServicesPage() {
  // Fetch services from Sanity backend
  const services: ServiceOffered[] = await getServices();

  return (
    <main>
      {/* Enhanced Header with Particles Effect */}
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url(/illustrations/lift02.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:py-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", isCurrentPage: true },
            ]}
          />
          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Our Services
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Complete elevator care throughout every lifecycle
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              From initial design consultation to emergency repairs, we provide
              comprehensive elevator services that ensure safety, reliability,
              and optimal performance for residential, commercial, and
              industrial properties.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact">
                <motion.button
                  className="btn btn-primary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-base" />
                  Get Service Quote
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-base" />
                  View Products
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Featured Services */}
          {services.some((service) => service.featured) && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-accent">
                    Featured Services
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
                  Our Most Popular Services
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                {services
                  .filter((service) => service.featured)
                  .map((service) => (
                    <ServiceCard
                      key={service._id}
                      title={service.title}
                      summary={service.summary}
                      tags={service.tags}
                      serviceId={service.slug}
                      featured={service.featured}
                      image={service.image}
                      imageAlt={service.imageAlt}
                      icon={service.icon}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* All Services */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
              {services.some((service) => service.featured)
                ? "All Services"
                : "Our Services"}
            </h2>
            <p className="text-gray-600 mt-2">
              Comprehensive elevator solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                summary={service.summary}
                tags={service.tags}
                serviceId={service.slug}
                featured={service.featured}
                image={service.image}
                imageAlt={service.imageAlt}
                icon={service.icon}
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

      <CallToActionSection />
    </main>
  );
}
