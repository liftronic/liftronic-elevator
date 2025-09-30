import { groq } from "next-sanity";

// Query to get paginated blog posts with optimized images
export const postsQuery = groq`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format",
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
  "mainImage": mainImage.asset->url + "?w=800&h=600&fit=crop&auto=format",
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
  "mainImage": mainImage.asset->url + "?w=1200&h=800&fit=crop&auto=format",
  "imageAlt": mainImage.alt,
  "tag": tag->title,
  "tagSlug": tag->slug.current,
  publishedAt,
  readTime,
  "author": author->{name, "slug": slug.current},
  "authorImage": author->image.asset->url + "?w=100&h=100&fit=crop",
  "authorBio": author->bio,
  body,
  "relatedPosts": relatedPosts[0..2]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url + "?w=600&h=400&fit=crop&auto=format",
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