import { groq } from "next-sanity";
import { client } from "../lib/client";

export interface FeaturedLift {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
}

export async function getFeaturedLifts(): Promise<FeaturedLift[]> {
  const query = groq`*[_type == "product" && featured == true]{
    _id,
    title,
    "slug": slug.current,
    subtitle
  }`;
  return client.fetch<FeaturedLift[]>(query);
}
