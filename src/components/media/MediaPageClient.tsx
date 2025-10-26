"use client";

import { useState } from "react";
import { MediaItem } from "~/sanity/lib/mediaTypes";
import MediaCard from "./MediaCard";
import MediaPreview from "./MediaPreview";

type MediaPageClientProps = {
  mediaItems: MediaItem[];
};

export default function MediaPageClient({ mediaItems }: MediaPageClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleNext = () => {
    if (!selectedMedia || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex((item) => item._id === selectedMedia._id);
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setSelectedMedia(mediaItems[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedMedia || mediaItems.length <= 1) return;
    const currentIndex = mediaItems.findIndex((item) => item._id === selectedMedia._id);
    const previousIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setSelectedMedia(mediaItems[previousIndex]);
  };

  return (
    <>
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          {mediaItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {mediaItems.map((item) => (
                <MediaCard
                  key={item._id}
                  item={item}
                  onClick={() => setSelectedMedia(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/70">
              <p>No media items available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      <MediaPreview
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasMultiple={mediaItems.length > 1}
      />
    </>
  );
}
