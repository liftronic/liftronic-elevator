"use client";

import { useEffect, useState, type ReactElement } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { BiBrush, BiGlobeAlt, BiPhoneCall, BiRefresh } from "react-icons/bi";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  tags: string[];
  icon: ReactElement;
};

const services: Service[] = [
  {
    title: "Design Strategy",
    description:
      "Concept-to-cab styling shaped around traffic flow, comfort, and safety priorities. We align every detail with your brand vision and passenger expectations.",
    tags: [
      "Design insight",
      "Performance",
      "Reliability",
      "Refined aesthetics",
    ],
    icon: <BiBrush className="h-6 w-6 text-accent" aria-hidden />,
  },
  {
    title: "Supply (Domestic / Exports)",
    description:
      "Certified passenger, home, and freight elevators shipped with meticulous component traceability. Logistics are synchronized for dependable global rollouts.",
    tags: ["Passenger", "Home", "Freight", "Global delivery"],
    icon: <BiGlobeAlt className="h-6 w-6 text-accent" aria-hidden />,
  },
  {
    title: "Installation & Maintenance",
    description:
      "Swift deployment sustained by preventive inspections, 24/7 support, and quick resolutions. Our teams stay on-call to keep every ride smooth and secure.",
    tags: [
      "24/7 support",
      "Scheduled care",
      "Rapid callbacks",
      "Expert repairs",
    ],
    icon: <BiPhoneCall className="h-6 w-6 text-accent" aria-hidden />,
  },
  {
    title: "Replacement Excellence",
    description:
      "Modernize legacy elevators to unlock smoother rides, current tech, and enduring safety. From ambiance to automation, we future-proof every upgrade.",
    tags: [
      "Performance uplift",
      "Comfort upgrade",
      "Tech refresh",
      "Safety assured",
    ],
    icon: <BiRefresh className="h-6 w-6 text-accent" aria-hidden />,
  },
];

const AUTO_ROTATE_MS = 5000;
const DESKTOP_VISIBLE = 3;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (services.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, []);

  if (services.length === 0) {
    return null;
  }

  const visibleDesktop = Array.from(
    { length: Math.min(DESKTOP_VISIBLE, services.length) },
    (_, offset) => services[(activeIndex + offset) % services.length]
  );

  const currentService = services[activeIndex];

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden scroll-mt-24 text-white"
    >
      <div className="absolute inset-0 -z-10 bg-[#071812]/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-[#0d221a]/60 to-[#04110c]/75" />
      <div className="container mx-auto flex min-h-screen flex-col justify-center px-4 py-24">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Solutions provided
          </h2>
          <p className="text-lg leading-relaxed text-white/75 md:text-xl">
            Liftronic delivers end-to-end elevator expertise, blending bespoke
            design, precise execution, and future-ready modernization for every
            building we serve.
          </p>
        </div>

        <div className="mt-12 md:hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={`${currentService.title}-${activeIndex}`}
              initial={{ opacity: 0, x: 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -44 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/15 p-8 shadow-xl shadow-black/15 backdrop-blur-xl"
            >
              <ImageBackdrop alt={currentService.title} sizes="100vw" />
              <CardContent service={currentService} />
            </motion.article>
          </AnimatePresence>
          <CarouselDots
            activeIndex={activeIndex}
            total={services.length}
            onSelect={setActiveIndex}
          />
        </div>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleDesktop.map((service, offset) => (
              <motion.article
                layout
                key={`${service.title}-${
                  (activeIndex + offset) % services.length
                }`}
                initial={{ opacity: 0, x: 56 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -56 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/15 p-8 shadow-xl shadow-black/15 transition-shadow duration-300 backdrop-blur-xl hover:shadow-2xl"
              >
                <ImageBackdrop
                  alt={service.title}
                  sizes="(min-width: 768px) 33vw"
                />
                <CardContent service={service} />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 hidden md:flex">
          <CarouselDots
            activeIndex={activeIndex}
            total={services.length}
            onSelect={setActiveIndex}
          />
        </div>
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
    <Link href="/services">
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
    </Link>
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
