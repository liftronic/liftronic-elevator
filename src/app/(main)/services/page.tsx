"use client";
import Link from "next/link";
import ServiceCard from "~/components/ServiceCard";

type Service = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "design-consultation",
    title: "Design & Consultation",
    summary:
      "Expert guidance from concept to completion with customized elevator solutions.",
    tags: ["Consultation", "Custom Design", "Planning"],
    featured: true,
  },
  {
    id: "installation",
    title: "Professional Installation",
    summary:
      "Certified technicians ensure safe, efficient installation of all elevator types.",
    tags: ["Installation", "Certified", "Professional"],
  },
  {
    id: "maintenance",
    title: "Preventive Maintenance",
    summary:
      "Scheduled maintenance programs to keep your elevators running smoothly.",
    tags: ["Maintenance", "Preventive", "Scheduled"],
    featured: true,
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url(/illustrations/lift02.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
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
              <Link href="/#contact" className="btn btn-primary">
                Get Service Quote
              </Link>
              <Link href="/products" className="btn">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                summary={service.summary}
                tags={service.tags}
                serviceId={service.id}
                badge={service.featured ? "Popular" : undefined}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
