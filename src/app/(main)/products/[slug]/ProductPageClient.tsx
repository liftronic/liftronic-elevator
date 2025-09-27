"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiHome, HiChevronRight } from "react-icons/hi";
import ProductFeatures from "~/components/ProductFeatures";
import ProductFAQ from "~/components/ProductFAQ";
import { useViewTransition } from "~/hooks/useViewTransition";

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
    <main
      className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-soft"
      style={pageStyle}
    >
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav
            className="flex items-center gap-2 text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-accent"
            >
              <HiHome className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <HiChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href="/products"
              className="text-gray-600 transition-colors hover:text-accent font-medium"
            >
              Products
            </Link>
            <HiChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-charcoal font-semibold max-w-[200px] truncate">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-white/80 to-gray-50/50">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-corner_at_top_right,_rgba(42,227,148,0.12),_transparent_60%)]" />
          <div className="absolute -left-20 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl opacity-60" />
          <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Content */}
            <div className="space-y-8">
              {/* Product Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-accent/10 to-accent/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title and Summary */}
              <div className="space-y-6">
                <h1 className="product-title text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                  {product.title}
                </h1>
                <p className="text-xl leading-relaxed text-gray-700 md:text-2xl lg:max-w-xl">
                  {product.summary}
                </p>
              </div>

              {/* Description Card */}
              <div className="rounded-2xl border border-gray-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
                <p className="text-lg leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link
                  href="/#contact"
                  className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/#services"
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                >
                  Explore Services
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

      {/* Overview Section */}
      <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            {/* Main Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-accent">
                    Overview
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                  Engineered for modern
                  <br />
                  <span className="text-accent">vertical transport</span>
                </h2>
                <p className="text-xl leading-relaxed text-gray-700 md:max-w-2xl">
                  {product.description}
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="group rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/30 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent/20">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <div className="h-6 w-6 rounded-full bg-accent"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Ideal Applications
                      </h3>
                      <p className="text-lg font-semibold text-charcoal">
                        {product.tags?.slice(0, 2).join(" • ") ||
                          "Versatile deployments"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-gray-50/30 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:border-accent/20">
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-accent/60"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Expert Support
                      </h3>
                      <p className="text-lg text-gray-700">
                        Dedicated engineers for planning, installation, and
                        comprehensive maintenance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Panel */}
            {hasSpecifications && (
              <div className="rounded-3xl border border-gray-200/60 bg-gradient-to-br from-white via-white to-gray-50/30 p-10 shadow-xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">
                      Key Specifications
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Essential metrics tailored to your building requirements
                      and performance needs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {product.specifications?.map((spec) => (
                      <div
                        key={`${spec.label}-${spec.value}`}
                        className="group rounded-xl border border-gray-200/40 bg-white/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-white"
                      >
                        <dt className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          {spec.label}
                        </dt>
                        <dd className="text-xl font-bold text-charcoal">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductFeatures features={product.features} />

      {/* Gallery Section */}
      <section className="border-t border-gray-200/60 bg-gradient-to-br from-gray-50/30 to-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto max-w-4xl text-center space-y-6 mb-16">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Visual Gallery
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Experience the
              <br />
              <span className="text-accent">quality in detail</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
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

          {/* Custom Finishes Call-out */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-charcoal">
                  Need custom finishes?
                </span>{" "}
                Share your inspiration and we&apos;ll create detailed mockups
                matching your exact vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductFAQ faqs={product.faqs} />

      {/* Call to Action */}
      <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-10">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Get Started
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Ready to elevate
                <br />
                <span className="text-accent">your project?</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Partner with our specialists to scope, install, and maintain a
                lift solution that perfectly fits your building requirements.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Link
                href="/#contact"
                className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request Consultation
              </Link>
              <button
                onClick={handleBackClick}
                className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
