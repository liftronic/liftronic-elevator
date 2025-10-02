import { groq } from "next-sanity";

// Query to get paginated blog posts with optimized images
export const postsQuery = groq`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=85",
  "mainImageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": mainImage.alt,
  "tag": tag->title,
  "tagSlug": tag->slug.current,
  publishedAt,
  readTime,
  "author": author->name
}`;

// Query to get total count of published posts
export const postsCountQuery = groq`count(*[_type == "post" && defined(publishedAt)])`;

// Query to get featured blog posts only
export const featuredPostsQuery = groq`*[_type == "post" && featured == true && defined(publishedAt)] | order(publishedAt desc) [0...2] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=90",
  "mainImageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": mainImage.alt,
  "tag": tag->title,
  "tagSlug": tag->slug.current,
  publishedAt,
  readTime,
  "author": author->name
}`;

// Query to get a single blog post by slug with optimized related posts
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url + "?w=1200&h=800&fit=crop&auto=format&fm=webp&q=90",
  "imageAlt": mainImage.alt,
  "tag": tag->title,
  "tagSlug": tag->slug.current,
  publishedAt,
  readTime,
  "author": author->{name, "slug": slug.current},
  "authorImage": author->image.asset->url + "?w=100&h=100&fit=crop&fm=webp&q=85",
  "authorBio": author->bio,
  body,
  "relatedPosts": relatedPosts[0..2]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url + "?w=600&h=400&fit=crop&auto=format&fm=webp&q=85",
    "mainImageLqip": mainImage.asset->metadata.lqip,
    "imageAlt": mainImage.alt,
    "tag": tag->title,
    readTime,
    "author": author->name,
    publishedAt
  },
  "seoTitle": seo.metaTitle,
  "seoDescription": seo.metaDescription,
  "seoKeywords": seo.keywords
}`;

// Query to get all post slugs (for static path generation)
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

// Query to get all tags
export const tagsQuery = groq`*[_type == "tag"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`;

// Query to get posts by tag
export const postsByTagQuery = groq`*[_type == "post" && tag->slug.current == $tagSlug && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "tag": tag->title,
  "tagSlug": tag->slug.current,
  publishedAt,
  readTime,
  "author": author->name,
  featured
}`;

// ============================================
// Product Queries
// ============================================

// Query to get all products for listing page
export const productsQuery = groq`*[_type == "product"] | order(featured desc, title asc) {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  description,
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current
  },
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=85",
  "mainImageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": mainImage.alt,
  featured
}`;

// Query to get featured products only
export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(title asc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  description,
  "tags": tags[]->{
    _id,
    title,
    "slug": slug.current
  },
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=90",
  "mainImageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": mainImage.alt,
  featured
}`;

// Query to get a single product by slug with all details
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
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
    "url": asset->url + "?w=1200&h=800&fit=crop&auto=format&fm=webp&q=85",
    "alt": alt
  },
  "seoTitle": seo.metaTitle,
  "seoDescription": seo.metaDescription,
  "seoKeywords": seo.keywords
}`;

// Query to get all product slugs (for static path generation)
export const productSlugsQuery = groq`*[_type == "product" && defined(slug.current)][].slug.current`;

// ============================================
// Media Queries
// ============================================

// Query to get all media items
export const mediaQuery = groq`*[_type == "media" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  description,
  type,
  image,
  youtubeUrl,
  thumbnail,
  category,
  tags,
  publishedAt
}`;

// Query to get media items by category
export const mediaByCategoryQuery = groq`*[_type == "media" && category == $category && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  description,
  type,
  image,
  youtubeUrl,
  thumbnail,
  category,
  tags,
  publishedAt
}`;

// ============================================
// Service Queries
// ============================================

// Query to get all services
export const servicesQuery = groq`*[_type == "serviceOffered"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=85",
  "mainImageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": mainImage.alt,
  icon
}`;

// ============================================
// Client Queries
// ============================================

// Query to get all clients
export const clientsQuery = groq`*[_type == "client"] | order(_createdAt desc) {
  _id,
  title,
  "image": image.asset->url + "?w=200&h=80&fit=max&auto=format&fm=webp&q=85",
  "imageAlt": image.alt
}`;

// ============================================
// Testimonial Queries
// ============================================

// Query to get all testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  testimonialFrom,
  testimonialDetail,
  "companyImage": companyImage.asset->url + "?w=100&h=100&fit=crop&auto=format&fm=webp&q=85",
  "imageAlt": companyImage.alt
}`;

// ============================================
// Home Page Combined Query
// ============================================

// Query to get all home page data in a single request
export const homePageDataQuery = groq`{
  "featuredProducts": *[_type == "product" && featured == true] | order(title asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current
    },
    "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=85",
    "mainImageLqip": mainImage.asset->metadata.lqip,
    "imageAlt": mainImage.alt,
    featured
  },
  "clients": *[_type == "client"] | order(_createdAt desc) {
    _id,
    title,
    "image": image.asset->url + "?w=200&h=80&fit=max&auto=format&fm=webp&q=85",
    "imageAlt": image.alt
  },
  "featuredMedia": *[_type == "media" && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    description,
    type,
    image,
    youtubeUrl,
    thumbnail,
    category,
    tags,
    publishedAt
  },
  "featuredBlogs": *[_type == "post" && featured == true && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format&fm=webp&q=85",
    "mainImageLqip": mainImage.asset->metadata.lqip,
    "imageAlt": mainImage.alt,
    "tag": tag->title,
    "tagSlug": tag->slug.current,
    publishedAt,
    readTime,
    "author": author->name
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc) [0...6] {
    _id,
    testimonialFrom,
    testimonialDetail,
    "companyImage": companyImage.asset->url + "?w=100&h=100&fit=crop&auto=format&fm=webp&q=85",
    "imageAlt": companyImage.alt
  }
}`;