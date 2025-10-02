import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface MediaItem {
  _id: string;
  _type: "media";
  title: string;
  description: string;
  type: "image" | "video";
  image?: SanityImageSource;
  youtubeUrl?: string;
  thumbnail?: SanityImageSource;
  category: "products" | "installations" | "maintenance" | "projects";
  tags?: string[];
  publishedAt: string;
}
