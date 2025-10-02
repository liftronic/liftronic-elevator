import { groq } from "next-sanity";
import { client } from "../lib/client";
import { ServiceOffered, ServiceOfferedFull } from "../lib/serviceTypes";

// Get all services for listing page with lazy loading support
export async function getServices(): Promise<ServiceOffered[]> {
  const query = groq`*[_type == "service"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageLqip": image.asset->metadata.lqip,
    "imageAlt": image.alt,
    icon,
    tags,
    featured
  }`;

  return client.fetch<ServiceOffered[]>(query);
}

// Get featured services only
export async function getFeaturedServices(): Promise<ServiceOffered[]> {
  const query = groq`*[_type == "service" && featured == true] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageLqip": image.asset->metadata.lqip,
    "imageAlt": image.alt,
    icon,
    tags,
    featured
  }`;

  return client.fetch<ServiceOffered[]>(query);
}

// Get service by slug for detail page
export async function getServiceBySlug(
  slug: string
): Promise<ServiceOfferedFull | null> {
  const query = groq`*[_type == "service" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    description,
    "image": image.asset->url,
    "imageAlt": image.alt,
    icon,
    tags,
    featured,
    features,
    specifications,
    "faqs": *[_type == "faq" && references(^._id)] | order(_createdAt asc) {
      question,
      answer
    },
    "relatedServices": *[_type == "service" && slug.current != $slug && featured == true][0...3]{
      _id,
      title,
      "slug": slug.current,
      summary,
      "image": image.asset->url,
      "imageLqip": image.asset->metadata.lqip,
      "imageAlt": image.alt,
      icon,
      tags,
      featured
    }
  }`;

  return client.fetch<ServiceOfferedFull | null>(query, { slug });
}

// Get services by tags with pagination support
export async function getServicesByTag(
  tag: string,
  limit = 10,
  offset = 0
): Promise<ServiceOffered[]> {
  const query = groq`*[_type == "service" && $tagName in tags] | order(_createdAt desc) [$offset...($offset + $limit)] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageLqip": image.asset->metadata.lqip,
    "imageAlt": image.alt,
    icon,
    tags,
    featured
  }`;

  return client.fetch<ServiceOffered[]>(query, { tagName: tag, limit, offset });
}

// Generate static params for service pages
export async function getServiceSlugs(): Promise<string[]> {
  const query = groq`*[_type == "service"]{"slug": slug.current}`;
  const services = await client.fetch<{ slug: string }[]>(query);
  return services.map((service) => service.slug);
}

// Get services with pagination for lazy loading
export async function getServicesPage(
  limit = 6,
  offset = 0
): Promise<ServiceOffered[]> {
  const query = groq`*[_type == "service"] | order(_createdAt desc) [$offset...($offset + $limit)] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageLqip": image.asset->metadata.lqip,
    "imageAlt": image.alt,
    icon,
    tags,
    featured
  }`;

  return client.fetch<ServiceOffered[]>(query, { limit, offset });
}
