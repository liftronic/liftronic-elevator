import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "~/components/products/ProductCard";
import Breadcrumb from "~/components/Breadcrumb";
import * as motion from "motion/react-client";
import CallToActionSection from "~/components/CallToActionSection";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import { client } from "~/sanity/lib/client";
import { productsQuery, featuredProductsQuery } from "~/sanity/lib/queries";
import type { Product } from "~/sanity/lib/productTypes";

export const metadata: Metadata = {
  title: "Products - Elevator Solutions | Lift Solutions",
  description: "A curated lineup spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
  openGraph: {
    title: "Elevate every building with precision - Products",
    description: "A curated lineup spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
    type: "website",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Elevator Solutions | Lift Solutions",
    description: "A curated lineup spanning residential, commercial and industrial needs.",
  },
  alternates: {
    canonical: "/products",
  },
};

async function getAllProducts(): Promise<Product[]> {
  return client.fetch(productsQuery, {}, { next: { revalidate: 3600 } });
}

async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(featuredProductsQuery, {}, { next: { revalidate: 3600 } });
}

export const revalidate = 3600; // 60 minutes

export default async function ProductsPage() {
  const [allProducts, featuredProducts] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
  ]);
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
                  className="btn btn-primary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-base" />
                  Request a Quote
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-base" />
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
            <div className="mb-8">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Featured Products
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Popular solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  summary={product.description}
                  tags={product.tags?.map((tag) => tag.title) || []}
                  productId={product.slug}
                  badge="Featured"
                  imageSrc={product.mainImage}
                  imageAlt={product.imageAlt}
                  blurDataURL={product.mainImageLqip}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              All products
            </h2>
            <p className="mt-2 text-gray-600">
              Browse our complete product lineup ({allProducts.length} products)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allProducts.map((product) => (
              <ProductCard
                key={product._id}
                title={product.title}
                summary={product.description}
                tags={product.tags?.map((tag) => tag.title) || []}
                productId={product.slug}
                badge={product.featured ? "Featured" : undefined}
                imageSrc={product.mainImage}
                imageAlt={product.imageAlt}
                blurDataURL={product.mainImageLqip}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
