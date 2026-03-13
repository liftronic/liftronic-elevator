"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import type { TeaserPopup } from "~/sanity/lib/teaserPopupTypes";
import TeaserPopupModal from "./TeaserPopupModal";

interface TeaserPopupProviderProps {
  popup: TeaserPopup | null;
}

export default function TeaserPopupProvider({
  popup,
}: TeaserPopupProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(Boolean(popup));
  }, [popup]);

  if (!popup) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <TeaserPopupModal
        popup={popup}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Suspense>
  );
}
