import type { Metadata } from "next";
import ProductRangeSection from "~/components/products/ProductRangeCarouselCard";
import CallToActionSection from "~/components/CallToActionSection";
import { getProductRanges } from "~/sanity/utils/getProductRanges";

export const metadata: Metadata = {
  title: "Product Ranges - Elevator Solutions | Lift Solutions",
  description:
    "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
  openGraph: {
    title: "Elevate every building with precision - Product Ranges",
    description:
      "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
    type: "website",
    url: "/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Ranges - Elevator Solutions | Lift Solutions",
    description:
      "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs.",
  },
  alternates: {
    canonical: "/products",
  },
};

export const revalidate = 3600; // 60 minutes

export default async function ProductsPage() {
  const productRanges = await getProductRanges();

  return (
    <main className="bg-white">
      {/* Product Ranges — grid layout: single-product ranges sit 3 per row,
          multi-product ranges span full width for the carousel */}
      <section className="pb-16 md:pb-24 pt-24 md:pt-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {productRanges.map((range, idx) => (
              <div
                key={range._id}
                className={
                  range.products.length === 1
                    ? "col-span-1"
                    : "col-span-1 md:col-span-2 lg:col-span-3"
                }
              >
                <ProductRangeSection
                  title={range.title}
                  description={range.description}
                  slug={range.slug}
                  featured={range.featured}
                  products={range.products}
                  index={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
