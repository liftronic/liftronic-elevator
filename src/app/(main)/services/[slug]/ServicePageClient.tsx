"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiHome, HiChevronRight } from "react-icons/hi";
import ProductFeatures from "~/components/products/ProductFeatures";
import ProductFAQ from "~/components/products/ProductFAQ";
import { useViewTransition } from "~/hooks/useViewTransition";

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
    <main
      className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20"
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
            <button
              onClick={handleBackClick}
              className="text-gray-600 transition-colors hover:text-accent"
            >
              Services
            </button>
            <HiChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50/30 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1
                    className="text-4xl font-extrabold leading-tight text-charcoal md:text-5xl lg:text-6xl service-title"
                    style={
                      {
                        "--title-transition-name": `service-title-${service.id}`,
                      } as React.CSSProperties
                    }
                  >
                    {service.title}
                  </h1>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>{service.description}</p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Link
                    href="/#contact"
                    className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Service Quote
                  </Link>
                  <button
                    onClick={handleBackClick}
                    className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                  >
                    View All Services
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div
                className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200/60 shadow-2xl service-image"
                style={
                  {
                    "--image-transition-name": `service-image-${service.id}`,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={heroImage}
                  alt={service.imageAlt || service.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-blue-200/30 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <ProductFeatures features={service.features} />

      {/* Service Specifications */}
      {hasSpecifications && (
        <section className="border-t border-gray-200/60 bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center space-y-6 mb-12">
                <div className="inline-block rounded-full bg-blue-50 px-4 py-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Service Details
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl">
                  What you can expect
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Key service parameters and performance metrics for your peace
                  of mind.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {service.specifications?.map((spec, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200/60 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <dt className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                      {spec.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-bold text-charcoal">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Process Gallery */}
      <section className="border-t border-gray-200/60 bg-gradient-to-br from-blue-50/30 via-white to-gray-50/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block rounded-full bg-blue-50 px-4 py-2">
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Our Process
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Experience the
              <br />
              <span className="text-blue-600">service excellence</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Professional service delivery with attention to detail and
              commitment to quality.
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

          {/* Service Guarantee Call-out */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-charcoal">
                  100% Satisfaction Guaranteed:
                </span>{" "}
                We stand behind our service quality with comprehensive
                warranties and ongoing support commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductFAQ faqs={service.faqs} />

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
                Ready to experience
                <br />
                <span className="text-accent">professional service?</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Connect with our service specialists to discuss your
                requirements and receive a customized service proposal.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Link
                href="/#contact"
                className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request Service
              </Link>
              <button
                onClick={handleBackClick}
                className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
