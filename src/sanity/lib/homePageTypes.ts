import type { Product } from "./productTypes";
import type { Client } from "./clientTypes";
import type { MediaItem } from "./mediaTypes";
import type { BlogPost } from "./blogTypes";
import type { Testimonial } from "./testimonialTypes";

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface HomePageData {
  featuredProducts: Product[];
  clients: Client[];
  featuredMedia: MediaItem[];
  featuredBlogs: BlogPost[];
  testimonials: Testimonial[];
}
