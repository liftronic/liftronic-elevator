import { client } from "../lib/client";
import type { TeaserPopup } from "../lib/teaserPopupTypes";

const teaserPopupQuery = `*[_type == "teaserPopup" && isEnabled == true][0]{
  _id,
  title,
  description,
  videoUrl,
  delaySeconds,
  isEnabled,
  showOncePerSession
}`;

export async function getTeaserPopup(): Promise<TeaserPopup | null> {
  const popup = await client.fetch<TeaserPopup | null>(
    teaserPopupQuery,
    {},
    { next: { revalidate: 60 } }, // Cache for 1 minute for quick toggle updates
  );

  return popup;
}
