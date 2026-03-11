// app/(main)/services/page.tsx

import type { Metadata } from "next";
import ServiceCard from "~/components/services/ServiceCard";
import CallToActionSection from "~/components/CallToActionSection";
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
      {/* All Services Grid */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 shadow-sm">
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
