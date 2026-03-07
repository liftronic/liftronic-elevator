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

export interface PrivateExperienceFormConfig {
  formGoogleSheetUrl?: string;
  formRecipientEmails?: string[];
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
  privateExperienceFormConfig?: PrivateExperienceFormConfig;
  specializedEngineering?: SpecializedEngineeringSection[];
  quoteEmail?: string;
  closingQuote?: string;
  contactPerson: ContactPerson;
  teamMembers?: BranchTeamMember[];
  mediaGallery?: BranchMediaItem[];
  stiltzProducts?: BranchProduct[];
  sectionVisibility?: {
    legacy?: boolean;
    stiltzExperience?: boolean;
    whyChoose?: boolean;
    specializedEngineering?: boolean;
    consultant?: boolean;
    stiltzProducts?: boolean;
    team?: boolean;
    media?: boolean;
  };
  isActive: boolean;
  order: number;
}
