"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Breadcrumb from "~/components/Breadcrumb";
import ProductFeatures from "~/components/products/ProductFeatures";
import ProductFAQ from "~/components/products/ProductFAQ";
import { useViewTransition } from "~/hooks/useViewTransition";
import { motion } from "motion/react";

// Product type definition
type Product = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags?: string[];
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imageSrc?: string;
  imageAlt?: string;
};

type ProductPageClientProps = {
  product: Product;
};

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  const pageStyle = {
    "--transition-name": `product-card-${product.id}`,
    "--image-transition-name": `product-image-${product.id}`,
    "--title-transition-name": `product-title-${product.id}`,
  } as React.CSSProperties;

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionTo("/products");
  };

  // Prefetch the products page immediately when this page loads
  useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  const heroImage = product.imageSrc || "/illustrations/product01.png";
  const galleryImages = [
    {
      src: heroImage,
      alt: `${product.title} cabin perspective`,
    },
    {
      src: heroImage,
      alt: `${product.title} control panel detail`,
    },
    {
      src: heroImage,
      alt: `${product.title} shaft view render`,
    },
    {
      src: heroImage,
      alt: `${product.title} installation snapshot`,
    },
  ];
  const hasSpecifications =
    Array.isArray(product.specifications) && product.specifications.length > 0;

  return (
    <main className="min-h-screen" style={pageStyle}>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-white/80 to-gray-50/50">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-corner_at_top_right,_rgba(42,227,148,0.12),_transparent_60%)]" />
          <div className="absolute -left-20 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl opacity-60" />
          <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-6 py-16 md:py-28">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.title, isCurrentPage: true },
            ]}
          />

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center mt-6">
            {/* Content */}
            <div className="space-y-8">
              {/* Title and Summary */}
              <div className="space-y-4">
                <h1 className="product-title text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                  {product.title}
                </h1>
                <p className="text-xl leading-relaxed text-gray-700 md:text-2xl lg:max-w-xl">
                  {product.summary}
                </p>
              </div>

              {/* Product Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-accent/80 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_35px_-10px_rgba(42,227,148,0.65)] ring-1 ring-inset ring-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description Card */}
              <div>
                <p className="text-lg leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link href="/#contact">
                  <motion.button
                    className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get a Quote
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Services
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="order-first lg:order-last">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-2xl product-image">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gray-900/5" />
                <Image
                  src={heroImage}
                  alt={product.imageAlt || `${product.title} render`}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasSpecifications && (
        <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="mx-auto space-y-4 mb-8">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Performance
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Technical specifications for {product.title}
              </h2>
            </div>

            {/* Specifications Grid */}
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.specifications?.map((spec) => (
                <div
                  key={`${spec.label}-${spec.value}`}
                  className="group rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/30 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent/20"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                    {spec.label}
                  </dt>
                  <dd className="mt-3 text-2xl font-bold text-charcoal md:text-3xl">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <ProductFeatures features={product.features} />

      {/* Gallery Section */}
      <section className="border-t border-gray-200/60 bg-gradient-to-br from-gray-50/30 to-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto space-y-6 mb-16">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Visual Gallery
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Experience the quality in detail
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
              High-fidelity renders showcasing cabin design, control systems,
              and installation excellence.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => {
              const isWide = index === 0;
              return (
                <div
                  key={`${image.alt}-${index}`}
                  className={`group relative overflow-hidden rounded-2xl border border-gray-200/60 shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                    isWide
                      ? "md:col-span-2 lg:col-span-2 aspect-[4/3]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      isWide
                        ? "(min-width: 1024px) 50vw, (min-width: 768px) 100vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                      {image.alt}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProductFAQ faqs={product.faqs} />

      {/* Call to Action */}
      <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Get Started
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Ready to elevate your project?
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Partner with our specialists to scope, install, and maintain a
                lift solution that perfectly fits your building requirements.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link href="/#contact">
                <motion.a
                  className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Consultation
                </motion.a>
              </Link>
              <motion.button
                onClick={handleBackClick}
                className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
