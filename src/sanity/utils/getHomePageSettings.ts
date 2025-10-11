import { client } from "../lib/client";
import { homePageSettingsQuery } from "../lib/queries";
import type { FAQ } from "../lib/homePageTypes";
import type { PortableTextBlock } from "@portabletext/types";

export interface SEOContentSection {
  title: string;
  content: PortableTextBlock[];
  keywords?: string[];
  order: number;
  defaultExpanded: boolean;
}

export interface HomePageSettings {
  featuredFaqs: FAQ[];
  showFaqSection: boolean;
  seoContentSections: SEOContentSection[];
  showSeoContentSection: boolean;
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  const settings = await client.fetch(
    homePageSettingsQuery,
    {},
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  // Provide defaults if no settings document exists
  return (
    settings || {
      featuredFaqs: [],
      showFaqSection: true,
      seoContentSections: [],
      showSeoContentSection: true,
    }
  );
}
