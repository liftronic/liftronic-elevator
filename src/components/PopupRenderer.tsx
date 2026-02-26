"use client";

import { useEffect } from "react";
import RequestQuoteModal from "~/components/RequestQuoteModal";
import TeaserPopupModal from "~/components/TeaserPopupModal";
import { usePopupManager } from "~/contexts/PopupManagerContext";

export default function PopupRenderer() {
  const { activePopup, closeActivePopup, productOptions } = usePopupManager();

  useEffect(() => {
    if (activePopup?.popupType === "teaser" && !activePopup.teaserConfig) {
      closeActivePopup();
    }
  }, [activePopup, closeActivePopup]);

  if (!activePopup) {
    return null;
  }

  if (activePopup.popupType === "teaser" && activePopup.teaserConfig) {
    return (
      <TeaserPopupModal
        isOpen={true}
        onClose={closeActivePopup}
        popup={activePopup.teaserConfig}
      />
    );
  }

  if (activePopup.popupType === "requestQuote") {
    return (
      <RequestQuoteModal
        isOpen={true}
        onClose={closeActivePopup}
        productOptions={productOptions}
        title={activePopup.requestQuoteConfig?.title}
        subtitle={activePopup.requestQuoteConfig?.subtitle}
      />
    );
  }

  return null;
}
