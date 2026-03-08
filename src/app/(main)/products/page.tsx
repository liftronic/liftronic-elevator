import type { Metadata } from "next";
import ProductRangeSection from "~/components/products/ProductRangeCarouselCard";
import ProductMiniCard from "~/components/products/ProductMiniCard";
import CallToActionSection from "~/components/CallToActionSection";
import { getProductRanges } from "~/sanity/utils/getProductRanges";

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: ProductsPageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const isFeaturedFilter = searchParams.featured === 'true';

  if (isFeaturedFilter) {
    return {
      title: "Featured Lifts - Elevator Solutions | Lift Solutions",
      description: "Explore our handpicked selection of top-tier residential and commercial featured elevator solutions.",
      openGraph: {
        title: "Featured Lifts - Elevator Solutions | Lift Solutions",
        description: "Explore our handpicked selection of top-tier residential and commercial featured elevator solutions.",
        type: "website",
        url: "/products?featured=true",
      },
      twitter: {
        card: "summary_large_image",
        title: "Featured Lifts - Elevator Solutions | Lift Solutions",
        description: "Explore our handpicked selection of top-tier residential and commercial featured elevator solutions.",
      },
      alternates: {
        canonical: "/products?featured=true",
      },
    };
  }

  return {
    title: "Product Ranges - Elevator Solutions | Lift Solutions",
    description: "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
    openGraph: {
      title: "Elevate every building with precision - Product Ranges",
      description: "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs. Designed for safety, efficiency and seamless ride quality.",
      type: "website",
      url: "/products",
    },
    twitter: {
      card: "summary_large_image",
      title: "Product Ranges - Elevator Solutions | Lift Solutions",
      description: "Explore our comprehensive range of elevator solutions spanning residential, commercial and industrial needs.",
    },
    alternates: {
      canonical: "/products",
    },
  };
}

export const revalidate = 3600; // 60 minutes


export default async function ProductsPage(props: ProductsPageProps) {
  const searchParams = await props.searchParams;
  const isFeaturedFilter = searchParams.featured === 'true';
  
  const productRanges = await getProductRanges(isFeaturedFilter);

  let content;
  if (isFeaturedFilter) {
    // Extract all products along with their parent range title for the flat list
    const featuredProductsWithRange = productRanges.flatMap((range) =>
      range.products.map((product) => ({ ...product, rangeTitle: range.title }))
    );

    // De-duplicate any products that might be cross-listed
    const uniqueFeaturedProducts = Array.from(
      new Map(featuredProductsWithRange.map((p) => [p._id, p])).values()
    );

    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {uniqueFeaturedProducts.map((product) => (
          <div key={product._id} className="h-full">
            <ProductMiniCard
              title={product.title}
              description={product.subtitle || product.description}
              slug={product.slug}
              imageSrc={product.mainImage}
              imageAlt={product.imageAlt}
              blurDataURL={product.mainImageLqip}
              featured={false}
              rangeTitle={product.rangeTitle}
            />
          </div>
        ))}
      </div>
    );
  } else {
    // Normal grouped view by product ranges
    content = (
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
    );
  }

  return (
    <main className="bg-white">
      {/* Page Header for Featured Filter */}
      {isFeaturedFilter && (
        <section className="bg-gray-50 pt-32 pb-12 md:pb-16 border-b border-gray-100">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Featured Elevators
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Explore our handpicked selection of top-tier residential and commercial elevator solutions, designed for space-saving efficiency and elegant integration.
            </p>
          </div>
        </section>
      )}

      {/* Product Ranges / Grid */}
      <section className={`pb-16 md:pb-24 ${isFeaturedFilter ? "pt-12 md:pt-16" : "pt-24 md:pt-28"}`}>
        <div className="container mx-auto px-6">
          {content}
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
