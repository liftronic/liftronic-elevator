import { PortableTextBlock } from "sanity";

// Blog post type for listing pages
export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  mainImageLqip?: string;
  imageAlt: string;
  tag: string;
  tagSlug: string;
  publishedAt: string;
  readTime: string;
  author: string;
};

// Full blog post type with content
export type BlogPostFull = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  imageAlt: string;
  tag: string;
  tagSlug: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    slug: string;
  };
  authorImage?: string;
  authorBio?: PortableTextBlock[];
  body: PortableTextBlock[];
  relatedPosts?: RelatedPost[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

// Related post type (simplified)
export type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  mainImageLqip?: string;
  imageAlt: string;
  tag: string;
  readTime: string;
  author: string;
  publishedAt: string;
};

// Tag type
export type BlogTag = {
  _id: string;
  title: string;
  slug: string;
};