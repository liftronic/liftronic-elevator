import { groq } from "next-sanity";
import { Service } from "../../../typings";
import { client } from "../lib/client";

export async function getServices(): Promise<Service[]> {
  const query = groq`*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    featured,
    tags,
    icon,
    "image": image.asset->url,
    features[] {
      title,
      description,
      icon
    },
    specifications[] {
      label,
      value
    }
  }`;
  return client.fetch<Service[]>(query);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = groq`*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    featured,
    tags,
    icon,
    "image": image.asset->url,
    features[] {
      title,
      description,
      icon
    },
    specifications[] {
      label,
      value
    }
  }`;
  return client.fetch<Service | null>(query, { slug });
}
