"use client";

import { Suspense } from "react";
import type { TeaserPopup } from "~/sanity/lib/teaserPopupTypes";
import TeaserPopupModal from "./TeaserPopupModal";

interface TeaserPopupProviderProps {
  popup: TeaserPopup | null;
}

export default function TeaserPopupProvider({
  popup,
}: TeaserPopupProviderProps) {
  if (!popup) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <TeaserPopupModal popup={popup} />
    </Suspense>
  );
}
