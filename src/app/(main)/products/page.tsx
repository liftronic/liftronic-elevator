import Link from "next/link";
import type { Metadata } from "next";
import ProductCarousel from "~/components/products/ProductCarousel";
import Breadcrumb from "~/components/Breadcrumb";
import * as motion from "motion/react-client";
import CallToActionSection from "~/components/CallToActionSection";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import { client } from "~/sanity/lib/client";
import { productsQuery, featuredProductsQuery } from "~/sanity/lib/queries";
import type { Product } from "~/sanity/lib/productTypes";

export const metadata: Metadata = {
  title: "Products - Elevator Solutions | Lift Solutions",
  description:
    "A curated lineup spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
  openGraph: {
    title: "Elevate every building with precision - Products",
    description:
      "A curated lineup spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
    type: "website",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Elevator Solutions | Lift Solutions",
    description:
      "A curated lineup spanning residential, commercial and industrial needs.",
  },
  alternates: {
    canonical: "/products",
  },
};

async function getAllProducts(): Promise<Product[]> {
  return client.fetch(productsQuery, {}, { next: { revalidate: 3600 } });
}

async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(
    featuredProductsQuery,
    {},
    { next: { revalidate: 3600 } }
  );
}

export const revalidate = 3600; // 60 minutes

export default async function ProductsPage() {
  const [allProducts, featuredProducts] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
  ]);

  // Filter out featured products from all products
  const featuredProductIds = new Set(featuredProducts.map((p) => p._id));
  const nonFeaturedProducts = allProducts.filter(
    (p) => !featuredProductIds.has(p._id)
  );

  return (
    <main>
      {/* Page hero */}
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover opacity-10 sm:bg-cover bg-no-repeat bg-right md:opacity-60"
          style={{
            backgroundImage: "url(/illustrations/lift01.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", isCurrentPage: true },
            ]}
          />

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
              <Link href="/#contact">
                <motion.button
                  className="btn btn-primary px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-sm md:text-base" />
                  Request a Quote
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-4 py-2 text-sm md:px-8 md:py-3 md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-sm md:text-base" />
                  View Services
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50/30 to-white">
          <div className="container mx-auto px-4">
            <div className="mb-2">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Featured Products
                </span>
              </div>
            </div>

            <ProductCarousel
              products={featuredProducts}
              title="Popular solutions"
              showAutoRotate={false}
            />
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={nonFeaturedProducts}
            title="All products"
            description={`Browse our complete product lineup (${nonFeaturedProducts.length} products)`}
            showAutoRotate={false}
          />
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
