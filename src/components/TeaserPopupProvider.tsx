"use client";

import { Suspense } from "react";
import { useState } from "react";
import type { TeaserPopup } from "~/sanity/lib/teaserPopupTypes";
import TeaserPopupModal from "./TeaserPopupModal";

interface TeaserPopupProviderProps {
  popup: TeaserPopup | null;
}

export default function TeaserPopupProvider({
  popup,
}: TeaserPopupProviderProps) {
  const [closedPopupId, setClosedPopupId] = useState<string | null>(null);

  if (!popup) {
    return null;
  }

  const isOpen = closedPopupId !== popup._id;

  return (
    <Suspense fallback={null}>
      <TeaserPopupModal
        popup={popup}
        isOpen={isOpen}
        onClose={() => setClosedPopupId(popup._id)}
      />
    </Suspense>
  );
}
