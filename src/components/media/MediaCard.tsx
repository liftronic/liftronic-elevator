"use client";

import Image from "next/image";
import { HiPlay, HiPhotograph } from "react-icons/hi";
import { MediaItem } from "~/sanity/lib/mediaTypes";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "~/sanity/lib/client";

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

type MediaCardProps = {
  item: MediaItem;
  onClick: () => void;
};

export default function MediaCard({ item, onClick }: MediaCardProps) {
  // Get thumbnail URL
  const getThumbnailUrl = () => {
    if (item.type === "video") {
      // Use custom thumbnail if available, otherwise use YouTube thumbnail
      if (item.thumbnail) {
        return urlFor(item.thumbnail).width(800).height(600).url();
      }
      if (item.youtubeUrl) {
        const videoId = getYouTubeId(item.youtubeUrl);
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    return item.image ? urlFor(item.image).width(800).height(600).url() : "";
  };

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer h-full flex flex-col"
    >
      {/* Media Preview */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={getThumbnailUrl()}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.type === "video" && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
              <HiPlay className="w-8 h-8 text-accent ml-1" />
            </div>
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              item.type === "video"
                ? "bg-accent text-black"
                : "bg-accent text-black"
            }`}
          >
            {item.type === "video" ? (
              <HiPlay className="w-3 h-3" />
            ) : (
              <HiPhotograph className="w-3 h-3" />
            )}
            {item.type === "video" ? "Video" : "Photo"}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-black backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 flex-1">
          {item.description}
        </p>
      </div>
    </div>
  );
}
