"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  return (
    <main className="min-h-screen bg-soft" style={pageStyle}>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-black/5">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-charcoal transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/products"
              className="text-gray-500 hover:text-charcoal transition-colors"
            >
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-charcoal font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Product Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 product-image">
              {product.imageSrc ? (
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏢</div>
                    <p className="text-gray-500 text-sm">Product Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={handleBackClick}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-charcoal transition-colors"
                  >
                    ← Back to Products
                  </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-charcoal tracking-tight product-title">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-600 mt-3">{product.summary}</p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              {product.specifications && (
                <div className="bg-soft rounded-xl p-6">
                  <h3 className="font-semibold text-charcoal mb-4">
                    Key Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex flex-col">
                        <dt className="text-sm text-gray-500">{spec.label}</dt>
                        <dd className="font-semibold text-charcoal">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="btn btn-primary">
                  Get Quote
                </Link>
                <Link
                  href="/#services"
                  className="btn border border-gray-200 bg-white text-charcoal hover:bg-gray-50"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <ProductFeatures features={product.features} />

      {/* FAQ Section */}
      <ProductFAQ faqs={product.faqs} />

      {/* Related Products / CTA */}
      <section className="bg-white border-t border-black/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8">
              Contact our experts to discuss your requirements and get a
              customized solution for your building.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/#contact" className="btn btn-primary">
                Request Consultation
              </Link>
              <button
                onClick={handleBackClick}
                className="btn border border-gray-200 bg-white text-charcoal hover:bg-gray-50"
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
