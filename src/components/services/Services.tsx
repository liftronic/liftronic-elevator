"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ServiceOffered } from "~/sanity/lib/serviceTypes";
import { getFeaturedServices } from "~/sanity/utils/getServices";
import {
  BiWrench,
  BiShield,
  BiRefresh,
  BiCog,
  BiStar,
  BiSupport,
  BiCheckCircle,
  BiGlobe,
  BiBuildings,
  BiTrendingUp,
  BiHeart,
} from "react-icons/bi";

// Enhanced icon mapping for services
const getServiceIcon = (iconName: string) => {
  // Map icon names from backend to actual React icon components
  const iconMap: Record<string, React.ReactElement> = {
    wrench: <BiWrench className="h-5 w-5" />,
    shield: <BiShield className="h-5 w-5" />,
    refresh: <BiRefresh className="h-5 w-5" />,
    cog: <BiCog className="h-5 w-5" />,
    star: <BiStar className="h-5 w-5" />,
    support: <BiSupport className="h-5 w-5" />,
    check: <BiCheckCircle className="h-5 w-5" />,
    globe: <BiGlobe className="h-5 w-5" />,
    buildings: <BiBuildings className="h-5 w-5" />,
    trending: <BiTrendingUp className="h-5 w-5" />,
    heart: <BiHeart className="h-5 w-5" />,
    // Add emoji to icon mapping
    "🔧": <BiWrench className="h-5 w-5" />,
    "🛡️": <BiShield className="h-5 w-5" />,
    "🔄": <BiRefresh className="h-5 w-5" />,
    "⚙️": <BiCog className="h-5 w-5" />,
    "⭐": <BiStar className="h-5 w-5" />,
    "🏢": <BiBuildings className="h-5 w-5" />,
    "📈": <BiTrendingUp className="h-5 w-5" />,
    "❤️": <BiHeart className="h-5 w-5" />,
  };

  // Return mapped icon or fallback icon
  return iconMap[iconName] || <BiCog className="h-5 w-5" />;
};

const DESKTOP_VISIBLE = 3;

export default function Services() {
  const [services, setServices] = useState<ServiceOffered[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const fetchedServices = await getFeaturedServices();
      setServices(fetchedServices.slice(0, 4)); // Limit to 4 featured services
    } catch (error) {
      console.error("Error loading services:", error);
      // Fallback to empty array if fetch fails
      setServices([]);
    }
  };

  // Auto-scroll removed - users can manually navigate through services

  if (!mounted) return null;

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
      <Image
        src="/illustrations/lift02.png"
        alt=""
        fill
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        priority={false}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-[#0d221a]/60 to-[#04110c]/75" />

      <div className="container mx-auto flex flex-col justify-center px-4 py-20">
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

        {/* Mobile Carousel */}
        <div className="mt-12 md:hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.article
              key={`${currentService.title}-${activeIndex}`}
              initial={{ opacity: 0, x: 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -44 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                <Image
                  src={currentService.image || "/illustrations/lift02.png"}
                  alt={currentService.imageAlt || currentService.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{currentService.title}</h3>
                  {currentService.featured && (
                    <span className="mt-2 inline-block bg-accent px-3 py-1 rounded-full text-sm font-medium text-black">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-white/80 leading-relaxed">
                  {currentService.summary}
                </p>

                {currentService.tags && currentService.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentService.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 bg-white/10 backdrop-blur text-white/90 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Mobile Dots Indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-accent"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="mt-12 hidden grid-cols-12 gap-8 md:grid lg:gap-12">
          {/* Service Cards - Left Side */}
          <div className="col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              {visibleDesktop.map((service, index) => (
                <motion.div
                  key={`${service._id}-${activeIndex}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`group relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${
                    index === 0
                      ? "border-accent bg-white/95 shadow-lg scale-105"
                      : "border-white/20 bg-white/10 backdrop-blur hover:border-white/40 hover:bg-white/20"
                  }`}
                  onClick={() =>
                    setActiveIndex((activeIndex + index) % services.length)
                  }
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          index === 0 ? "bg-accent/10" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={index === 0 ? "text-accent" : "text-white"}
                        >
                          {getServiceIcon(service.icon || "")}
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3
                        className={`font-bold text-lg mb-2 leading-tight ${
                          index === 0 ? "text-charcoal" : "text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-3 ${
                          index === 0 ? "text-gray-600" : "text-white/70"
                        }`}
                      >
                        {service.summary}
                      </p>

                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className={`inline-block text-xs px-2 py-1 rounded-full ${
                                index === 0
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-white/20 text-white/80"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Main Service Display - Right Side */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                  <Image
                    src={currentService.image || "/illustrations/lift02.png"}
                    alt={currentService.imageAlt || currentService.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 58vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Floating badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                        <div className="text-accent">
                          {getServiceIcon(currentService.icon || "")}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-charcoal">
                        {currentService.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                      {currentService.title}
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      {currentService.summary}
                    </p>
                  </div>

                  {/* Key Features */}
                  {/* {currentService.tags && currentService.tags.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {currentService.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl border border-white/20"
                        >
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                          <span className="text-white/90 font-medium text-sm">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/services">
            <motion.button
              className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
