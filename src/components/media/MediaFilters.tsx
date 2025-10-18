"use client";

import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import { HiPlay, HiPhotograph, HiEye } from "react-icons/hi";
import { MediaItem } from "~/sanity/lib/mediaTypes";
import MediaCard from "./MediaCard";

const categories = [
  { key: "all", label: "All Media", icon: HiPhotograph },
  { key: "products", label: "Products", icon: HiPhotograph },
  { key: "installations", label: "Installations", icon: HiPlay },
  { key: "maintenance", label: "Maintenance", icon: HiPhotograph },
  { key: "projects", label: "Projects", icon: HiEye },
];

type MediaFiltersProps = {
  items: MediaItem[];
  onPreview: (item: MediaItem) => void;
  onFilteredItemsChange: (items: MediaItem[]) => void;
};

export default function MediaFilters({
  items,
  onPreview,
  onFilteredItemsChange,
}: MediaFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Update parent component with filtered items whenever they change
  useEffect(() => {
    onFilteredItemsChange(filteredItems);
  }, [filteredItems, onFilteredItemsChange]);

  return (
    <>
      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-accent text-black shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {category.key === "all"
                      ? items.length
                      : items.filter((item) => item.category === category.key)
                          .length}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item) => (
                <MediaCard
                  key={item._id}
                  item={item}
                  onClick={() => onPreview(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <HiPhotograph className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No media found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category to see more content.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
