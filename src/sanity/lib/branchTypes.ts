export interface SanityImage {
  asset: {
    url: string;
    metadata?: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: unknown;
}

export interface ContactPerson {
  name: string;
  position: string;
  photo?: SanityImage;
  email?: string;
  phone?: string;
}

export interface BranchTeamMember {
  name: string;
  position: string;
  bio?: string;
  image: SanityImage;
  email?: string;
  phone?: string;
}

export interface BranchMediaItem {
  title: string;
  description?: string;
  type: "image" | "video";
  image?: SanityImage;
  youtubeUrl?: string;
}

export interface BranchProduct {
  _id: string;
  title: string;
  slug: string;
}

export interface Branch {
  _id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
  description?: string;
  heroImage?: SanityImage;
  contactPerson: ContactPerson;
  teamMembers?: BranchTeamMember[];
  mediaGallery?: BranchMediaItem[];
  stiltzProducts?: BranchProduct[];
  isActive: boolean;
  order: number;
}
