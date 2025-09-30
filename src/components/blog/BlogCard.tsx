"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";
import { useViewTransition } from "~/hooks/useViewTransition";

type BlogCardProps = {
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  blogId?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function BlogCard({
  title,
  excerpt,
  tag,
  date,
  readTime,
  author,
  blogId,
  href,
  imageSrc,
  imageAlt,
}: BlogCardProps) {
  const blogHref = href || (blogId ? `/blogs/${blogId}` : "#");
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if (blogId) {
      e.preventDefault();
      transitionTo(blogHref);
    }
  };

  const handleMouseEnter = useCallback(() => {
    // Prefetch the blog page on hover for faster navigation
    if (blogId) {
      router.prefetch(blogHref);
    }
  }, [blogId, blogHref, router]);

  const cardStyle = blogId
    ? ({
        "--transition-name": `blog-card-${blogId}`,
        "--image-transition-name": `blog-image-${blogId}`,
        "--title-transition-name": `blog-title-${blogId}`,
      } as React.CSSProperties)
    : {};

  // Use the specified blog image or fallback to placeholder
  const finalImageSrc = imageSrc || "/assets/service_banner.png";

  return (
    <article
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        blogId ? "blog-card cursor-pointer" : ""
      } flex flex-col h-full`}
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
          blogId ? "blog-image" : ""
        } aspect-[5/3]`}
      >
        <Image
          src={finalImageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Tag overlay */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-white/20">
            {tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-grow">
          {/* Meta information */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 overflow-hidden">
            <time dateTime={date} className="whitespace-nowrap flex-shrink-0">
              {date}
            </time>
            <span className="flex-shrink-0">•</span>
            <span className="whitespace-nowrap flex-shrink-0">{readTime}</span>
            <span className="flex-shrink-0">•</span>
            <span className="truncate min-w-0">{author}</span>
          </div>

          {/* Title */}
          <h3
            className={`font-semibold text-gray-900 tracking-tight leading-tight group-hover:text-gray-800 transition-colors ${
              blogId ? "blog-title" : ""
            } text-lg`}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-gray-600 leading-relaxed text-sm line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* Action area */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 flex-shrink-0">
          {blogId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(blogHref);
              }}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Read Article
            </button>
          ) : (
            <Link
              href={blogHref}
              className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:bg-accent/90 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Read Article
            </Link>
          )}

          {blogId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                transitionTo(blogHref);
              }}
              className="inline-flex items-center text-sm font-medium text-gray-500 transition-all hover:text-accent group-hover:translate-x-1"
            >
              Continue reading
              <HiArrowRight className="ml-1 h-4 w-4" />
            </button>
          ) : (
            <Link
              href={blogHref}
              className="inline-flex items-center text-sm font-medium text-gray-500 transition-all hover:text-accent group-hover:translate-x-1"
            >
              Continue reading
              <HiArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
