import { groq } from "next-sanity";
import { client } from "../lib/client";
import type { FAQ } from "../lib/homePageTypes";

export interface HomePageSettings {
  featuredFaqs: FAQ[];
  showFaqSection: boolean;
}

const homePageSettingsQuery = groq`*[_type == "homePageSettings" && _id == "homePageSettings"][0] {
  "featuredFaqs": featuredFaqs[]-> {
    _id,
    question,
    answer
  },
  showFaqSection
}`;

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
    }
  );
}
