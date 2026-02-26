import { groq } from "next-sanity";
import { client } from "../lib/client";
import type { TeaserPopup } from "../lib/teaserPopupTypes";

const teaserPopupQuery = groq`*[_type == "teaserPopup" && isActive == true][0]{
  _id,
  title,
  description,
  videoUrl,
  delaySeconds,
  showOncePerSession,
  isActive
}`;

export async function getTeaserPopup(): Promise<TeaserPopup | null> {
  return client.fetch<TeaserPopup | null>(teaserPopupQuery);
}
