import { client } from "../lib/client";
import type { Branch } from "../lib/branchTypes";

const branchQuery = `*[_type == "branch" && isActive == true] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  city,
  address,
  phone,
  email,
  mapUrl,
  description,
  heroImage {
    asset -> { url, metadata { dimensions } },
    alt,
    hotspot
  },
  contactPerson {
    name,
    position,
    photo {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    email,
    phone
  },
  teamMembers[] {
    name,
    position,
    bio,
    image {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    email,
    phone
  },
  mediaGallery[] {
    title,
    description,
    type,
    image {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    youtubeUrl
  },
  "stiltzProducts": stiltzProducts[] -> {
    _id,
    title,
    "slug": slug.current
  },
  isActive,
  order
}`;

const singleBranchQuery = `*[_type == "branch" && slug.current == $slug && isActive == true][0] {
  _id,
  name,
  "slug": slug.current,
  city,
  address,
  phone,
  email,
  mapUrl,
  description,
  heroImage {
    asset -> { url, metadata { dimensions } },
    alt,
    hotspot
  },
  contactPerson {
    name,
    position,
    photo {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    email,
    phone
  },
  teamMembers[] {
    name,
    position,
    bio,
    image {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    email,
    phone
  },
  mediaGallery[] {
    title,
    description,
    type,
    image {
      asset -> { url, metadata { dimensions } },
      alt,
      hotspot
    },
    youtubeUrl
  },
  "stiltzProducts": stiltzProducts[] -> {
    _id,
    title,
    "slug": slug.current
  },
  isActive,
  order
}`;

export async function getBranches(): Promise<Branch[]> {
  const branches = await client.fetch<Branch[]>(
    branchQuery,
    {},
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );
  return branches;
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  const branch = await client.fetch<Branch | null>(
    singleBranchQuery,
    { slug },
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );
  return branch;
}
