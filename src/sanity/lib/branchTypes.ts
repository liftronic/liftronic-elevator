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
  subtitle?: string;
  description?: string;
  mainImage?: string;
  mainImageLqip?: string;
  imageAlt?: string;
}

export interface WhyChooseReason {
  title: string;
  description: string;
}

export interface StiltzExperienceItem {
  title: string;
  description: string;
}

export interface StiltzExperience {
  intro?: string;
  experiences?: StiltzExperienceItem[];
}

export interface BookingSection {
  description?: string;
  conciergePhone?: string;
  visitAddress?: string;
  gpsLink?: string;
}

export interface SpecializedEngineeringFeature {
  title: string;
  description: string;
}

export interface SpecializedEngineeringSection {
  title: string;
  subtitle?: string;
  description: string;
  features?: SpecializedEngineeringFeature[];
}

export interface BranchConsultant {
  name?: string;
  position?: string;
  phone?: string;
  email?: string;
}

export interface LegacySection {
  title?: string;
  body?: string;
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
  heroTitle?: string;
  tagline?: string;
  legacySection?: LegacySection;
  whyChooseReasons?: WhyChooseReason[];
  stiltzExperience?: StiltzExperience;
  bookingSection?: BookingSection;
  specializedEngineering?: SpecializedEngineeringSection[];
  consultant?: BranchConsultant;
  quoteEmail?: string;
  closingQuote?: string;
  heroImage?: SanityImage;
  contactPerson: ContactPerson;
  teamMembers?: BranchTeamMember[];
  mediaGallery?: BranchMediaItem[];
  stiltzProducts?: BranchProduct[];
  isActive: boolean;
  order: number;
}
