import { Product } from "./productTypes";

// Product Range type for listing pages with products for carousel
export type ProductRange = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  image?: string;
  imageLqip?: string;
  imageAlt?: string;
  productCount?: number;
  products: Product[]; // Full product details for carousel display
  order: number;
  _createdAt: string;
  _updatedAt?: string;
};

// Product Range with full details including products
export type ProductRangeFull = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  image?: string;
  imageLqip?: string;
  imageAlt?: string;
  products: Product[];
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  _createdAt: string;
  _updatedAt?: string;
};
