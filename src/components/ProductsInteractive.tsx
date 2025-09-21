"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  summary: string;
  description: string;
  specs: {
    speed: string;
    capacity: string;
    drive: string;
  };
  featured?: boolean;
};

const products: Product[] = [
  {
    id: "gearless",
    title: "Gearless Traction Elevators",
    summary:
      "High-efficiency, smooth ride systems ideal for mid to high-rise buildings.",
    description:
      "Advanced permanent magnet synchronous motor technology delivers exceptional energy efficiency and whisper-quiet operation for premium installations.",
    specs: {
      speed: "1–2.5 m/s",
      capacity: "6–20 persons",
      drive: "Gearless PMSM",
    },
    featured: true,
  },
  {
    id: "mrl",
    title: "MRL (Machine-Room-Less)",
    summary:
      "Space-saving technology with reduced energy consumption and clean installation.",
    description:
      "Innovative compact design eliminates the need for a separate machine room, maximizing building space while maintaining superior performance standards.",
    specs: {
      speed: "0.5–1.6 m/s",
      capacity: "4–13 persons",
      drive: "Compact Gearless",
    },
  },
  {
    id: "freight",
    title: "Freight Elevators",
    summary:
      "Rugged, high-capacity elevators for industrial transport and logistics.",
    description:
      "Heavy-duty construction with reinforced components designed to handle demanding industrial environments and continuous operation cycles.",
    specs: {
      speed: "0.25–1.0 m/s",
      capacity: "1000–5000 kg",
      drive: "Geared Traction",
    },
  },
  {
    id: "home",
    title: "Home Elevators",
    summary:
      "Compact, quiet lifts for residential convenience and accessibility.",
    description:
      "Elegant residential solutions combining modern aesthetics with reliable functionality, perfect for enhancing home accessibility and value.",
    specs: {
      speed: "0.15–0.3 m/s",
      capacity: "2–5 persons",
      drive: "Hydraulic/Traction",
    },
  },
  {
    id: "modernization",
    title: "Modernization Kits",
    summary: "Upgrade safety, control, and efficiency with modular retrofits.",
    description:
      "Comprehensive upgrade solutions that transform existing elevators with latest safety features, smart controls, and energy-efficient components.",
    specs: {
      speed: "Variable",
      capacity: "Existing + 20%",
      drive: "Upgraded Systems",
    },
  },
];

export default function ProductsInteractive() {
  const [active, setActive] = useState(products[0].id);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const current = products.find((p) => p.id === active)!;
  const currentIndex = products.findIndex((p) => p.id === active);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate products every 10 seconds
  useEffect(() => {
    if (isAutoRotating) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % products.length;
        setActive(products[nextIndex].id);
      }, 10000); // 10 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, currentIndex]);

  // Handle manual product selection
  const handleProductClick = (productId: string) => {
    setActive(productId);
    setIsAutoRotating(false); // Pause auto-rotation when user interacts

    // Resume auto-rotation after 30 seconds of inactivity
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 30000);
  };
  return (
    <section
      id="products"
      className="min-h-screen py-20 scroll-mt-24 relative overflow-hidden bg-white"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        {/* Header section matching other sections' typography */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Products
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Discover our comprehensive range of elevator solutions designed for
            safety, efficiency, and modern architecture. Each product represents
            the pinnacle of engineering excellence.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-5 gap-6 items-start max-w-7xl mx-auto">
          {/* Product Selection Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {products.map((p, index) => {
              const isActive = p.id === active;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => handleProductClick(p.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                      : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                      {p.title}
                    </h3>
                    {p.featured && (
                      <span className="text-[10px] uppercase tracking-wide bg-accent text-black px-2 py-1 rounded font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {p.summary}
                  </p>
                </motion.button>
              );
            })}

            {/* Call to action */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-accent hover:text-gray-900 transition-colors font-medium"
              >
                Explore all products
                <svg
                  className="w-4 h-4"
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
          </motion.div>

          {/* Product Details Card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 md:p-8"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {current.title}
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {current.summary}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                      <div className="text-accent text-xl font-bold mb-1">
                        {current.specs.speed}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Speed Range
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                      <div className="text-accent text-xl font-bold mb-1">
                        {current.specs.capacity}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Capacity
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                      <div className="text-accent text-lg font-bold mb-1">
                        {current.specs.drive}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">
                        Drive System
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <motion.button
                      className="btn btn-primary px-8 py-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More About {current.title}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
