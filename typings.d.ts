// typings.d.ts
import { SanityDocument, Reference } from "sanity";

export interface Social extends SanityDocument {
  _type: "social";
  title: string;
  icon: string;
  url: string;
  tags?: Reference<Tag>[];
}

export interface Tag extends SanityDocument {
  _type: "tag";
  title: string;
  slug: { _type: "slug"; current: string };
}

export interface Performance extends SanityDocument {
  _type: "performance";
  performanceTitle: string;
  performanceFigure: string;
  performancePic: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
}

export interface Testimonial extends SanityDocument {
  _type: "testimonial";
  testimonialFrom: string;
  companyImage: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  testimonialDetail: string;
}

export interface Client extends SanityDocument {
  _type: "client";
  title: string;
  image: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
}

export interface FAQ extends SanityDocument {
  _type: "faq";
  question: string;
  answer: string;
}

export interface KeyFeature extends SanityDocument {
  _type: "keyFeature";
  title: string;
  description: string;
  icon: string;
}

export interface Service extends SanityDocument {
  _type: "service";
  title: string;
  slug?: string;
  summary?: string;
  description: string;
  featured?: boolean;
  tags?: string[];
  icon: string;
  image?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product extends SanityDocument {
  _type: "product";
  title: string;
  subtitle?: string;
  description: string;
  tags?: Reference<Tag>[];
  faqs?: Reference<FAQ>[];
  keyFeatures?: Reference<KeyFeature>[];
  specifications?: ProductSpecification[];
}

export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  slug: { _type: "slug"; current: string };
  author?: Reference<Author>;
  mainImage?: {
    asset: { _id: string; url: string };
    alt?: string;
  };
  categories?: Reference<Category>[];
  publishedAt?: string;
  body?: BlockContent[];
}

export interface Author extends SanityDocument {
  _type: "author";
  name: string;
  slug: { _type: "slug"; current: string };
  image?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  bio?: BlockContent[];
}

export interface Category extends SanityDocument {
  _type: "category";
  title: string;
  slug: { _type: "slug"; current: string };
  description?: string;
}

export interface BlockContent {
  _type: "block" | "image";
  _key?: string;
  style?: string;
  children?: {
    _type: "span";
    text: string;
    marks?: string[];
  }[];
  markDefs?: any[];
  // For images
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
}
