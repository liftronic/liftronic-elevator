"use client";
import Link from "next/link";
import ProductCard from "~/components/ProductCard";

type Product = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  featured?: boolean;
};

const products: Product[] = [
  {
    id: "home",
    title: "Home Elevators",
    summary: "Compact, quiet lifts purpose-built for residences and villas.",
    tags: ["Residential", "Compact"],
    featured: true,
  },
  {
    id: "passenger",
    title: "Passenger Elevators",
    summary: "Reliable people movement for apartments, offices and hotels.",
    tags: ["Commercial", "High‑usage"],
  },
  {
    id: "freight",
    title: "Freight Elevators",
    summary: "Heavy‑duty cabins with rugged finishes for goods and logistics.",
    tags: ["Industrial", "High‑capacity"],
  },
  {
    id: "hospital",
    title: "Hospital / Stretcher Elevators",
    summary: "Wide cabins and smooth acceleration tailored for healthcare.",
    tags: ["Healthcare", "Spacious"],
  },
  {
    id: "mrl",
    title: "MRL (Machine‑Room‑Less)",
    summary: "Space‑efficient design with excellent energy performance.",
    tags: ["Space saving", "Efficient"],
    featured: true,
  },
  {
    id: "hydraulic",
    title: "Hydraulic Lifts",
    summary: "Cost‑effective solution for low‑rise buildings with smooth ride.",
    tags: ["Low‑rise", "Value"],
  },
  {
    id: "dumbwaiter",
    title: "Dumbwaiters",
    summary: "Compact service lifts for kitchens, restaurants and stores.",
    tags: ["Service", "Compact"],
  },
  {
    id: "car",
    title: "Car Elevators",
    summary: "Move vehicles vertically to optimize parking footprints.",
    tags: ["Automotive", "Heavy"],
  },
  {
    id: "capsule",
    title: "Glass / Capsule Elevators",
    summary: "Panoramic cabins that add architectural drama to spaces.",
    tags: ["Aesthetic", "Panoramic"],
  },
  {
    id: "modernization",
    title: "Modernization Kits",
    summary: "Upgrade controls, doors and interiors for safety and comfort.",
    tags: ["Retrofit", "Safety"],
  },
  {
    id: "escalators",
    title: "Escalators",
    summary: "Efficient people flow for transit hubs and malls.",
    tags: ["Transit", "Retail"],
  },
  {
    id: "walks",
    title: "Moving Walks",
    summary: "Horizontal movers for airports and large retail formats.",
    tags: ["Airports", "Retail"],
  },
];

export default function ProductsPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-br from-white to-soft">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Our Products
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Elevate every building with precision
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A curated lineup spanning residential, commercial and industrial
              needs. Designed for safety, efficiency and seamless ride quality.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact" className="btn btn-primary">
                Request a Quote
              </Link>
              <Link href="/#services" className="btn">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                title={p.title}
                summary={p.summary}
                tags={p.tags}
                productId={p.id}
                badge={p.featured ? "Featured" : undefined}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
