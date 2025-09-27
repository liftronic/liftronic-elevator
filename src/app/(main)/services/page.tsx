// app/(main)/services/page.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Breadcrumb from "~/components/Breadcrumb";
import ServiceCard from "~/components/services/ServiceCard";

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
        <div className="relative z-10 container mx-auto px-4 py-16 md:pt-28 md:py-20">
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
                  Get Service Quote
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="btn px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                summary={service.summary}
                tags={service.tags}
                serviceId={service.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact CTA with Modern Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mt-20"
      >
        <div className="bg-gradient-to-r from-accent to-green-500 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
          </div>

          <div className="relative text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Elevate Your Building?
              </h3>
              <p className="text-xl mb-8 opacity-95 leading-relaxed">
                Get expert consultation and personalized solutions tailored to
                your specific needs. Our team is ready to transform your
                vertical transportation experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                className="btn bg-white hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Free Consultation</span>
                <motion.span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </motion.span>
              </motion.button>

              <motion.button
                className="btn border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Call: +1 (555) 123-4567</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-white/20"
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Certified Technicians</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
