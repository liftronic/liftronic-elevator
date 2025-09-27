"use client";

import { useEffect, useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BiBrush, BiGlobeAlt, BiPhoneCall, BiRefresh } from "react-icons/bi";

type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: ReactElement;
  href: string; // Add href for navigation
};

const services: Service[] = [
  {
    id: "installation",
    title: "Elevator Installation",
    description:
      "Professional installation of cutting-edge elevator systems with superior craftsmanship and safety standards.",
    tags: ["New Construction", "Custom Design", "Safety Certified"],
    icon: <BiBrush className="text-2xl" />,
    href: "/services#installation",
  },
  {
    id: "maintenance",
    title: "Maintenance & Repair",
    description:
      "Comprehensive maintenance programs and emergency repair services to keep your elevators running smoothly 24/7.",
    tags: ["24/7 Support", "Preventive Care", "Emergency Response"],
    icon: <BiRefresh className="text-2xl" />,
    href: "/services#maintenance",
  },
  {
    id: "modernization",
    title: "Modernization",
    description:
      "Upgrade existing elevator systems with latest technology, improving efficiency, safety, and passenger experience.",
    tags: ["Smart Technology", "Energy Efficient", "Code Compliance"],
    icon: <BiGlobeAlt className="text-2xl" />,
    href: "/services#modernization",
  },
  {
    id: "consultation",
    title: "Consultation & Planning",
    description:
      "Expert consultation for elevator planning, traffic analysis, and custom solution design for your building needs.",
    tags: ["Expert Analysis", "Custom Solutions", "Project Planning"],
    icon: <BiPhoneCall className="text-2xl" />,
    href: "/services#consultation",
  },
];

const AUTO_ROTATE_MS = 5000;
const DESKTOP_VISIBLE = 3;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From installation to maintenance, we provide comprehensive elevator
            solutions that ensure safety, reliability, and optimal performance
            for your building.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Service Cards */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                      activeIndex === index
                        ? "bg-accent text-white border-accent shadow-lg"
                        : "bg-white hover:bg-gray-50 border-gray-200 hover:border-accent/30 hover:shadow-md"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl transition-colors ${
                          activeIndex === index
                            ? "bg-white/20"
                            : "bg-accent/10 text-accent group-hover:bg-accent/20"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-semibold mb-3 ${
                            activeIndex === index
                              ? "text-white"
                              : "text-charcoal"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`leading-relaxed mb-4 ${
                            activeIndex === index
                              ? "text-white/90"
                              : "text-gray-600"
                          }`}
                        >
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                activeIndex === index
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-100 text-gray-700 group-hover:bg-accent/10 group-hover:text-accent"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Visual Display */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Placeholder for service-related image */}
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <div className="text-4xl text-accent">
                        {services[activeIndex].icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal mb-4">
                      {services[activeIndex].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {services[activeIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-accent scale-110"
                      : "bg-gray-300 hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <span>View All Services</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
function ImageBackdrop({ alt, sizes }: { alt: string; sizes: string }) {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/assets/sample_img.jpg"
          alt={alt}
          fill
          sizes={sizes}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#071812]/80 via-[#0f231b]/72 to-accent/30" />
    </>
  );
}

function CardContent({ service }: { service: Service }) {
  return (
    <div className="relative flex h-full flex-col justify-between gap-10 text-white">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent shadow-sm ring-1 ring-accent/30">
            {service.icon}
          </span>
          <h3 className="text-2xl font-bold md:text-3xl">{service.title}</h3>
        </div>
        <p className="text-base leading-relaxed text-white/85 md:text-lg">
          {service.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 capitalize backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CarouselDots({
  activeIndex,
  total,
  onSelect,
}: {
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="mx-auto mt-6 flex w-full justify-center gap-2 md:mt-0 md:w-auto"
      aria-hidden
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={`dot-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
            index === activeIndex
              ? "bg-white scale-110"
              : "bg-white/30 hover:bg-white/55"
          }`}
          aria-label={`Show service ${index + 1}`}
          aria-pressed={index === activeIndex}
        />
      ))}
    </div>
  );
}
