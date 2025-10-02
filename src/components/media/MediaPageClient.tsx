"use client";

import { useState } from "react";
import { MediaItem } from "~/sanity/lib/mediaTypes";
import MediaFilters from "./MediaFilters";
import MediaPreview from "./MediaPreview";

type MediaPageClientProps = {
  mediaItems: MediaItem[];
};

export default function MediaPageClient({ mediaItems }: MediaPageClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>(mediaItems);

  const handleNext = () => {
    if (!selectedMedia || filteredItems.length <= 1) return;
    const currentIndex = filteredItems.findIndex((item) => item._id === selectedMedia._id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedMedia(filteredItems[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedMedia || filteredItems.length <= 1) return;
    const currentIndex = filteredItems.findIndex((item) => item._id === selectedMedia._id);
    const previousIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedMedia(filteredItems[previousIndex]);
  };

  return (
    <>
      <MediaFilters
        items={mediaItems}
        onPreview={setSelectedMedia}
        onFilteredItemsChange={setFilteredItems}
      />
      <MediaPreview
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasMultiple={filteredItems.length > 1}
      />
    </>
  );
}
