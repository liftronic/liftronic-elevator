// Product type for listing pages
export type Product = {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  tags?: ProductTag[];
  featured?: boolean;
  mainImage?: string;
  mainImageLqip?: string;
  imageAlt?: string;
};

// Full product type with all details
export type ProductFull = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  tags?: ProductTag[];
  keyFeatures?: KeyFeature[];
  specifications?: Specification[];
  faqs?: FAQ[];
  mainImage?: string;
  imageAlt?: string;
  gallery?: GalleryImage[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

// Product tag type
export type ProductTag = {
  _id: string;
  title: string;
  slug: string;
};

// Key feature type
export type KeyFeature = {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
};

// Specification type
export type Specification = {
  label: string;
  value: string;
};

// FAQ type
export type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

// Gallery image type
export type GalleryImage = {
  _key: string;
  url: string;
  lqip?: string;
  alt?: string;
};
