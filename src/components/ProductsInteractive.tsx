"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

type Product = {
  id: string;
  title: string;
  summary: string;
  featured?: boolean;
};

const products: Product[] = [
  {
    id: "gearless",
    title: "Gearless Traction Elevators",
    summary:
      "High-efficiency, smooth ride systems ideal for mid to high-rise buildings.",
    featured: true,
  },
  {
    id: "mrl",
    title: "MRL (Machine-Room-Less)",
    summary:
      "Space-saving technology with reduced energy consumption and clean installation.",
  },
  {
    id: "freight",
    title: "Freight Elevators",
    summary:
      "Rugged, high-capacity elevators for industrial transport and logistics.",
  },
  {
    id: "home",
    title: "Home Elevators",
    summary:
      "Compact, quiet lifts for residential convenience and accessibility.",
  },
  {
    id: "modernization",
    title: "Modernization Kits",
    summary: "Upgrade safety, control, and efficiency with modular retrofits.",
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
    <section id="products" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our comprehensive range of elevator solutions designed for
            safety, efficiency, and modern architecture.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 space-y-2">
          {products.map((p) => {
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                onClick={() => handleProductClick(p.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10"
                    : "border-black/10 hover:bg-black/5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{p.title}</div>
                  {p.featured && (
                    <span className="text-[10px] uppercase tracking-wide bg-accent text-black px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </button>
            );
          })}
          <a
            href="#"
            className="block text-sm mt-4 text-accent hover:underline"
          >
            Explore more products →
          </a>
        </div>

        <div className="md:col-span-2">
          <div className="relative overflow-hidden rounded-xl bg-white border border-black/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-semibold">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm opacity-80">{current.summary}</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-lg bg-soft p-3">
                    <div className="opacity-60">Speed</div>
                    <div className="font-medium">1–2.5 m/s</div>
                  </div>
                  <div className="rounded-lg bg-soft p-3">
                    <div className="opacity-60">Capacity</div>
                    <div className="font-medium">6–20 persons</div>
                  </div>
                  <div className="rounded-lg bg-soft p-3">
                    <div className="opacity-60">Drive</div>
                    <div className="font-medium">Gearless PMSM</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
