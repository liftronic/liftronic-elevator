"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductBreadcrumb from "~/components/ProductBreadcrumb";
import BlogCard from "~/components/blog/BlogCard";
import { useViewTransition } from "~/hooks/useViewTransition";

// Blog post type definition
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc?: string;
  imageAlt?: string;
  relatedPosts?: string[];
};

type BlogPostClientProps = {
  post: BlogPost;
  allPosts: Record<string, BlogPost>;
};

export default function BlogPostClient({
  post,
  allPosts,
}: BlogPostClientProps) {
  const { transitionTo } = useViewTransition();
  const router = useRouter();

  const pageStyle = {
    "--transition-name": `blog-card-${post.id}`,
    "--image-transition-name": `blog-image-${post.id}`,
    "--title-transition-name": `blog-title-${post.id}`,
  } as React.CSSProperties;

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    transitionTo("/blogs");
  };

  // Prefetch the blog page immediately when this page loads
  useEffect(() => {
    router.prefetch("/blogs");
  }, [router]);

  const heroImage = post.imageSrc || "/assets/service_banner.png";

  // Get related posts
  const relatedPosts = post.relatedPosts
    ? post.relatedPosts.map((id) => allPosts[id]).filter(Boolean)
    : Object.values(allPosts)
        .filter((p) => p.id !== post.id && p.tag === post.tag)
        .slice(0, 3);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" },
    { label: post.title, isCurrentPage: true },
  ];

  // Function to render markdown-like content as HTML
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p
            key={elements.length}
            className="mb-4 text-gray-700 leading-relaxed"
          >
            {currentParagraph.join(" ")}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="mb-6 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-accent mr-2 font-bold">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("# ")) {
        flushParagraph();
        flushList();
        elements.push(
          <h1
            key={elements.length}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0"
          >
            {trimmedLine.slice(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith("## ")) {
        flushParagraph();
        flushList();
        elements.push(
          <h2
            key={elements.length}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8"
          >
            {trimmedLine.slice(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith("### ")) {
        flushParagraph();
        flushList();
        elements.push(
          <h3
            key={elements.length}
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 mt-6"
          >
            {trimmedLine.slice(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith("- ")) {
        flushParagraph();
        if (!inList) {
          inList = true;
        }
        listItems.push(trimmedLine.slice(2));
      } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        flushParagraph();
        flushList();
        elements.push(
          <h4
            key={elements.length}
            className="text-lg font-semibold text-gray-900 mb-2 mt-4"
          >
            {trimmedLine.slice(2, -2)}
          </h4>
        );
      } else if (trimmedLine === "") {
        flushParagraph();
        if (inList) {
          flushList();
        }
      } else {
        if (inList) {
          flushList();
        }
        currentParagraph.push(trimmedLine);
      }
    });

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <main className="min-h-screen" style={pageStyle}>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-white/80 to-gray-50/50">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-corner_at_top_right,_rgba(42,227,148,0.12),_transparent_60%)]" />
          <div className="absolute -left-20 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl opacity-60" />
          <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-6 py-16 md:py-28">
          <ProductBreadcrumb items={breadcrumbItems} />

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-center mt-6">
            {/* Content */}
            <div className="space-y-8">
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-accent font-semibold">
                  {post.tag}
                </span>
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>

              {/* Title and Summary */}
              <div className="space-y-4">
                <h1 className="blog-title text-4xl font-bold leading-tight text-charcoal md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="text-xl leading-relaxed text-gray-700 md:text-2xl lg:max-w-xl">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link
                  href="/#contact"
                  className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Expert Consultation
                </Link>
                <button
                  onClick={handleBackClick}
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
                >
                  All Articles
                </button>
              </div>
            </div>

            {/* Blog Image */}
            <div className="order-first lg:order-last">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-white shadow-2xl blog-image">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gray-900/5" />
                <Image
                  src={heroImage}
                  alt={post.imageAlt || `${post.title} cover image`}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200/60 bg-gradient-to-br from-gray-50/30 to-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="mx-auto space-y-6 mb-16">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Continue Reading
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Related articles
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Explore more insights and expertise from our technical team
              </p>
            </div>

            {/* Related Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  tag={relatedPost.tag}
                  date={relatedPost.date}
                  readTime={relatedPost.readTime}
                  author={relatedPost.author}
                  blogId={relatedPost.id}
                  imageSrc={relatedPost.imageSrc}
                  imageAlt={relatedPost.imageAlt}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="border-t border-gray-200/60 bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                  Get Started
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
                Ready to implement these insights?
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Connect with our expert team to discuss how these solutions can
                be applied to your specific elevator needs and building
                requirements.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/#contact"
                className="btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Consultation
              </Link>
              <button
                onClick={handleBackClick}
                className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300"
              >
                Read More Articles
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
