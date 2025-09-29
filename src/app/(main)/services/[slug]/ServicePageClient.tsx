"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Features from "~/components/Features";
import ProductFAQ from "~/components/products/ProductFAQ";
import Breadcrumb from "~/components/Breadcrumb";
import { useViewTransition } from "~/hooks/useViewTransition";
import { motion } from "motion/react";
import CallToActionSection from "~/components/CallToActionSection";
import { FiMessageSquare, FiEye } from "react-icons/fi";

// Service type definition
type Service = {
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

type ServicePageClientProps = {
  service: Service;
};

export default function ServicePageClient({ service }: ServicePageClientProps) {
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  const pageStyle = {
    "--transition-name": `service-card-${service.id}`,
    "--image-transition-name": `service-image-${service.id}`,
    "--title-transition-name": `service-title-${service.id}`,
  } as React.CSSProperties;

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionTo("/services");
  };

  // Prefetch the services page immediately when this page loads
  useEffect(() => {
    router.prefetch("/services");
  }, [router]);

  const heroImage = service.imageSrc || "/illustrations/lift02.png";
  const galleryImages = [
    {
      src: heroImage,
      alt: `${service.title} service overview`,
    },
    {
      src: heroImage,
      alt: `${service.title} process detail`,
    },
    {
      src: heroImage,
      alt: `${service.title} team at work`,
    },
    {
      src: heroImage,
      alt: `${service.title} quality assurance`,
    },
  ];
  const hasSpecifications =
    Array.isArray(service.specifications) && service.specifications.length > 0;

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
              { label: "Services", href: "/services" },
              { label: service.title, isCurrentPage: true },
            ]}
          />

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center mt-6">
            {/* Content */}
            <div className="space-y-8">
              {/* Title and Summary */}
              <div className="space-y-4">
                <h1 className="service-title text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
                <p className="text-xl leading-relaxed text-gray-700 md:text-2xl lg:max-w-xl">
                  {service.summary}
                </p>
              </div>

              {/* Service Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description Card */}
              <div>
                <p className="text-lg leading-relaxed text-gray-700">
                  {service.description}
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
                    <FiMessageSquare className="text-lg" />
                    Request Service
                  </motion.button>
                </Link>
                <Link href="/products">
                  <motion.button
                    className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiEye className="text-lg" />
                    Explore Products
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Service Image */}
            <div className="order-first lg:order-last">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-2xl service-image">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gray-900/5" />
                <Image
                  src={heroImage}
                  alt={service.imageAlt || `${service.title} service`}
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

      {/* Service Specifications */}
      {hasSpecifications && (
        <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto space-y-4 mb-8">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Service Details
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Specifications for {service.title}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Key performance indicators and maintenance metrics tailored to
                your operations.
              </p>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.specifications?.map((spec) => (
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

      {/* Service Features */}
      <Features features={service.features} />

      {/* Service Gallery */}
      <section className="border-t border-gray-200/60 bg-gradient-to-br from-gray-50/30 to-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto space-y-6 mb-16">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Service Gallery
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Experience our service craftsmanship
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
              Step inside our maintenance workflow, on-site expertise, and
              safety-first execution through vivid visuals.
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

      <ProductFAQ faqs={service.faqs} />

      <CallToActionSection
        secondaryAction={{
          label: "View All Services",
          onClick: handleBackClick,
        }}
      />
    </main>
  );
}
