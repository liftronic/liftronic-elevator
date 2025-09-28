"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { HiPlay, HiPhotograph, HiEye } from "react-icons/hi";
import { FiEye, FiMessageSquare } from "react-icons/fi";
import Breadcrumb from "~/components/Breadcrumb";
import CallToActionSection from "~/components/CallToActionSection";

// Media item types
type MediaItem = {
  id: string;
  type: "image" | "video";
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  category: "products" | "installations" | "maintenance" | "projects";
  tags: string[];
  createdAt: string;
};

// Mock data - replace with actual data from CMS/API
const mediaItems: MediaItem[] = [
  {
    id: "1",
    type: "video",
    title: "Modern Passenger Elevator Installation",
    description:
      "Complete installation process of our state-of-the-art passenger elevator system in a commercial building.",
    src: "/assets/sample_1.mp4",
    thumbnail: "/illustrations/product01.png",
    category: "installations",
    tags: ["passenger", "commercial", "installation"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    type: "image",
    title: "Luxury Elevator Cabin Design",
    description:
      "Premium cabin interior with modern finishes and smart controls.",
    src: "/illustrations/lift01.png",
    thumbnail: "/illustrations/lift01.png",
    category: "products",
    tags: ["luxury", "cabin", "interior"],
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    type: "video",
    title: "Service & Maintenance Overview",
    description:
      "Our comprehensive maintenance service ensuring optimal elevator performance.",
    src: "/assets/sample.mp4",
    thumbnail: "/assets/sample_img.jpg",
    category: "maintenance",
    tags: ["maintenance", "service", "safety"],
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    type: "image",
    title: "Glass Elevator Shaft",
    description:
      "Stunning glass elevator installation offering panoramic views.",
    src: "/illustrations/lift02.png",
    thumbnail: "/illustrations/lift02.png",
    category: "projects",
    tags: ["glass", "modern", "panoramic"],
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    type: "image",
    title: "Control Panel Technology",
    description: "Advanced touch-screen control systems with smart features.",
    src: "/illustrations/product01.png",
    thumbnail: "/illustrations/product01.png",
    category: "products",
    tags: ["technology", "controls", "smart"],
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    type: "video",
    title: "Residential Elevator Project",
    description: "Custom residential elevator installation for luxury homes.",
    src: "/assets/sample_1.mp4",
    thumbnail: "/assets/sample_img.jpg",
    category: "projects",
    tags: ["residential", "luxury", "custom"],
    createdAt: "2024-01-03",
  },
];

const categories = [
  { key: "all", label: "All Media", icon: HiPhotograph },
  { key: "products", label: "Products", icon: HiPhotograph },
  { key: "installations", label: "Installations", icon: HiPlay },
  { key: "maintenance", label: "Maintenance", icon: HiPhotograph },
  { key: "projects", label: "Projects", icon: HiEye },
];

// Lazy loading hook
function useIntersectionObserver(
  elementRef: React.RefObject<HTMLDivElement | null>,
  threshold = 0.1
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, threshold]);

  return isIntersecting;
}

// Media item component with lazy loading
function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, 0.1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isVisible, isLoaded]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Media Preview */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {isLoaded ? (
          <>
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setIsLoaded(true)}
            />
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <HiPlay className="w-8 h-8 text-accent ml-1" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              item.type === "video"
                ? "bg-red-500/90 text-white"
                : "bg-blue-500/90 text-white"
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
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/90 text-white backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="text-xs text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(mediaItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(mediaItems);
    } else {
      setFilteredItems(
        mediaItems.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  if (!mounted) return null;

  return (
    <main>
      {/* Page hero */}
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover opacity-10 sm:bg-cover bg-no-repeat bg-right md:opacity-60"
          style={{
            backgroundImage: "url(/assets/service_banner.png)",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 md:pt-28 md:pb-20">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Media Gallery", isCurrentPage: true },
            ]}
          />

          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Media Gallery
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Explore Our Work
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover our latest projects, product showcases, and
              behind-the-scenes content showcasing our elevator solutions and
              installations.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact">
                <motion.button
                  className="btn btn-primary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-base" />
                  Request a Quote
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-base" />
                  View Products
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-accent text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                  <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {category.key === "all"
                      ? mediaItems.length
                      : mediaItems.filter(
                          (item) => item.category === category.key
                        ).length}
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
              {filteredItems.map((item, index) => (
                <MediaCard key={item.id} item={item} index={index} />
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

      <CallToActionSection
        title="Want to see your project featured?"
        description="Get in touch with us to discuss your elevator needs and join our gallery of successful installations."
        primaryAction={{
          label: "Start Your Project",
          href: "/#contact",
        }}
        secondaryAction={{
          label: "View Products",
          href: "/products",
        }}
      />
    </main>
  );
}
