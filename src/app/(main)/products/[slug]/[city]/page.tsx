import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ProductPageClient from "../ProductPageClient";
import type { ProductFull } from "~/sanity/lib/productTypes";

interface LocationPageData {
  city: string;
  citySlug: string;
  uniqueContent: PortableTextBlock[];
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  published: boolean;
  enableIndexing: boolean;
}

interface ProductWithLocation extends ProductFull {
  locationPage: LocationPageData;
}

async function getProductWithLocation(
  productSlug: string,
  citySlug: string
): Promise<ProductWithLocation | null> {
  const query = groq`*[_type == "product" && slug.current == $productSlug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    subtitle,
    description,
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    "keyFeatures": keyFeatures[]->{
      _id,
      title,
      description,
      icon
    },
    specifications,
    "faqs": faqs[]->{
      _id,
      question,
      answer
    },
    "mainImage": mainImage.asset->url + "?w=1200&h=800&fit=crop&auto=format&fm=webp&q=90",
    "imageAlt": mainImage.alt,
    "gallery": gallery[]{
      _key,
      "url": asset->url + "?w=1200&h=900&fit=crop&auto=format&fm=webp&q=85",
      "lqip": asset->metadata.lqip,
      "alt": alt
    },
    "seoTitle": seo.metaTitle,
    "seoDescription": seo.metaDescription,
    "seoKeywords": seo.keywords,
    "locationPage": locationPages[@.citySlug.current == $citySlug][0] {
      city,
      "citySlug": citySlug.current,
      uniqueContent,
      metaTitle,
      metaDescription,
      keywords,
      published,
      enableIndexing
    }
  }`;

  const product = await client.fetch(
    query,
    { productSlug, citySlug },
    { next: { revalidate: 3600 } }
  );

  if (!product || !product.locationPage || !product.locationPage.published) {
    return null;
  }

  return product;
}

async function getAllLocationProductParams() {
  const query = groq`*[_type == "product" && defined(locationPages)] {
    "productSlug": slug.current,
    "cities": locationPages[published == true] {
      "citySlug": citySlug.current
    }
  }`;

  const products = await client.fetch(
    query,
    {},
    { next: { revalidate: 3600 } }
  );

  const params: { slug: string; city: string }[] = [];

  for (const product of products) {
    for (const city of product.cities || []) {
      if (city.citySlug) {
        params.push({
          slug: product.productSlug,
          city: city.citySlug,
        });
      }
    }
  }

  return params;
}

type Props = {
  params: Promise<{
    slug: string;
    city: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const product = await getProductWithLocation(slug, city);

  if (!product || !product.locationPage) {
    return {
      title: "Product Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locationPage = product.locationPage;

  return {
    title: locationPage.metaTitle || `${product.title} | ${locationPage.city}`,
    description: locationPage.metaDescription || product.description,
    keywords: locationPage.keywords?.join(", "),
    alternates: {
      canonical: locationPage.enableIndexing
        ? `/products/${slug}/${city}`
        : `/products/${slug}`,
    },
    openGraph: {
      title:
        locationPage.metaTitle || `${product.title} | ${locationPage.city}`,
      description: locationPage.metaDescription || product.description,
      images: product.mainImage
        ? [
            {
              url: product.mainImage,
              alt: `${product.title} in ${locationPage.city}`,
              width: 1200,
              height: 800,
            },
          ]
        : [],
      type: "website",
      url: `${siteUrl}/products/${slug}/${city}`,
    },
    twitter: {
      card: "summary_large_image",
      title:
        locationPage.metaTitle || `${product.title} | ${locationPage.city}`,
      description: locationPage.metaDescription || product.description,
      images: product.mainImage ? [product.mainImage] : [],
    },
    robots: {
      index: locationPage.enableIndexing,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function LocationProductPage({ params }: Props) {
  const { slug, city } = await params;
  const product = await getProductWithLocation(slug, city);

  if (!product || !product.locationPage) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locationPage = product.locationPage;

  // Product JSON-LD with location
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.title} - ${locationPage.city}`,
    description: locationPage.metaDescription || product.description,
    image: product.mainImage
      ? {
          "@type": "ImageObject",
          url: product.mainImage,
          width: 1200,
          height: 800,
          caption: `${product.title} in ${locationPage.city}`,
        }
      : undefined,
    brand: {
      "@type": "Organization",
      name: "Liftronic Elevator",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: `${siteUrl}/products/${slug}/${city}`,
      areaServed: {
        "@type": "City",
        name: locationPage.city,
      },
    },
    url: `${siteUrl}/products/${slug}/${city}`,
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${siteUrl}/products/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: locationPage.city,
        item: `${siteUrl}/products/${slug}/${city}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main>
        {/* Location Badge */}
        <div className="bg-accent/10 border-b border-accent/20 py-2">
          <div className="container mx-auto px-4">
            <p className="text-sm text-center text-charcoal">
              📍 Now viewing: <strong>{product.title}</strong> in{" "}
              <strong>{locationPage.city}</strong>
            </p>
          </div>
        </div>

        {/* Location-Specific Content */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
                {product.title} in {locationPage.city}
              </h1>
              <p className="text-lg text-gray-600">
                Location-specific information and insights
              </p>
            </div>

            <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
              <PortableText value={locationPage.uniqueContent} />
            </div>
          </div>
        </section>

        {/* Main Product Page (includes CTA at the end) */}
        <ProductPageClient product={product} />
      </main>
    </>
  );
}

// Generate static paths for all published location products
export async function generateStaticParams() {
  return await getAllLocationProductParams();
}

export const revalidate = 3600; // 60 minutes
