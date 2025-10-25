// app/(main)/services/page.tsx

import * as motion from "motion/react-client";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumb from "~/components/Breadcrumb";
import ServiceCard from "~/components/services/ServiceCard";
import CallToActionSection from "~/components/CallToActionSection";
import { FiMessageSquare, FiEye } from "react-icons/fi";
import { getServices } from "~/sanity/utils/getServices";
import { ServiceOffered } from "~/sanity/lib/serviceTypes";

export const metadata: Metadata = {
  title: "Services - Elevator Solutions | Lift Solutions",
  description:
    "Complete elevator care throughout every lifecycle. From initial design consultation to emergency repairs, comprehensive elevator services for residential, commercial, and industrial properties.",
  openGraph: {
    title: "Complete elevator care throughout every lifecycle - Services",
    description:
      "From initial design consultation to emergency repairs, comprehensive elevator services that ensure safety, reliability, and optimal performance.",
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - Elevator Solutions | Lift Solutions",
    description: "Complete elevator care throughout every lifecycle.",
  },
  alternates: {
    canonical: "/services",
  },
};

export const revalidate = 3600; // 60 minutes

export default async function ServicesPage() {
  // Fetch services from Sanity backend
  const services: ServiceOffered[] = await getServices();

  return (
    <main>
      {/* Page hero */}
      <section className="relative">
        {/* Background image - hidden on mobile, shown on desktop */}
        <div
          className="absolute inset-0 hidden md:block bg-cover opacity-60 bg-no-repeat bg-right"
          style={{
            backgroundImage: "url(/illustrations/lift04.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:pb-20">
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
                  className="btn btn-primary px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-sm md:text-base" />
                  Get Service Quote
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-sm md:text-base" />
                  View Products
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              All services
            </h2>
            <p className="mt-2 text-gray-600">
              Browse our complete service lineup ({services.length} services)
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
                badge={service.featured ? "Featured" : undefined}
                imageSrc={service.image}
                imageAlt={service.imageAlt}
                blurDataURL={service.imageLqip}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
