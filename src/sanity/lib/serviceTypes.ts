// Service type for listing pages
export type ServiceOffered = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  image?: string;
  imageLqip?: string;
  imageAlt?: string;
  tags?: string[];
  featured?: boolean;
  _createdAt: string;
  _updatedAt?: string;
  icon?: string;
};

// Full service type with complete details
export type ServiceOfferedFull = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  featured?: boolean;
  features?: ServiceFeature[];
  specifications?: ServiceSpecification[];
  faqs?: ServiceFAQ[];
  relatedServices?: RelatedService[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

// Service feature type
export type ServiceFeature = {
  title: string;
  description: string;
  icon: string;
};

// Service specification type
export type ServiceSpecification = {
  label: string;
  value: string;
};

// Service FAQ type
export type ServiceFAQ = {
  question: string;
  answer: string;
};

// Related service type (simplified)
export type RelatedService = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  image?: string;
  imageLqip?: string;
  imageAlt?: string;
  tags?: string[];
  featured?: boolean;
};

// Service category type
export type ServiceCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};
