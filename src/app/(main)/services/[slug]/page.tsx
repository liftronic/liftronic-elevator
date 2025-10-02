import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageClient from "./ServicePageClient";
import { getServiceBySlug, getServiceSlugs } from "~/sanity/utils/getServices";
import { ServiceOfferedFull } from "~/sanity/lib/serviceTypes";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Liftronic Services`,
    description: service.summary,
    keywords: service.tags?.join(", "),
    openGraph: {
      title: `${service.title} | Liftronic Services`,
      description: service.summary,
      images: service.image ? [service.image] : ["/liftronic.png"],
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service: ServiceOfferedFull | null = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}
