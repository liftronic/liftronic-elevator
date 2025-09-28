import * as motion from "motion/react-client";
import Link from "next/link";
import BlogCard from "~/components/blog/BlogCard";
import FeaturedBlogCard from "~/components/blog/FeaturedBlogCard";
import Breadcrumb from "~/components/Breadcrumb";
import CallToActionSection from "~/components/CallToActionSection";
import { FiEye, FiMessageSquare } from "react-icons/fi";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "modernization-elevators-age-gracefully",
    title: "Modernization: Elevators That Age Gracefully",
    excerpt:
      "From controllers to door upgrades — how to extend lifespan and improve ride quality without full replacement.",
    content: "",
    tag: "Modernization",
    date: "Aug 12, 2025",
    readTime: "5 min read",
    author: "Liftronic Engineering Team",
    featured: true,
    imageSrc: "/assets/service_banner.png",
    imageAlt: "Elevator modernization process",
  },
  {
    id: "safety-checklist-residential-buildings",
    title: "Safety Checklist: Residential Buildings",
    excerpt:
      "A comprehensive checklist facility managers can use monthly to keep passengers safe and downtime low.",
    content: "",
    tag: "Safety",
    date: "Jul 28, 2025",
    readTime: "8 min read",
    author: "Safety Engineering Team",
    imageSrc: "/illustrations/lift01.png",
    imageAlt: "Elevator safety inspection",
  },
  {
    id: "mrl-vs-conventional-systems",
    title: "Machine-Room-Less (MRL) vs. Conventional",
    excerpt:
      "Space, efficiency, and maintenance factors when choosing between MRL and conventional elevator systems.",
    content: "",
    tag: "Guides",
    date: "Jul 10, 2025",
    readTime: "6 min read",
    author: "Technical Advisory Team",
    featured: true,
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "MRL elevator system comparison",
  },
  {
    id: "predictive-maintenance-basics",
    title: "Predictive Maintenance Basics",
    excerpt:
      "Sensors, runtime logs, and when to schedule service — the fundamentals of predictive upkeep.",
    content: "",
    tag: "Maintenance",
    date: "Jun 22, 2025",
    readTime: "7 min read",
    author: "Service Operations Team",
    imageSrc: "/illustrations/product01.png",
    imageAlt: "Predictive maintenance sensors",
  },
  {
    id: "cab-interiors-that-last",
    title: "Aesthetics: Cab Interiors That Last",
    excerpt:
      "Materials, lighting, and touchpoints that balance durability with a premium look and feel.",
    content: "",
    tag: "Design",
    date: "Jun 3, 2025",
    readTime: "4 min read",
    author: "Design & Architecture Team",
    imageSrc: "/assets/sample_img.jpg",
    imageAlt: "Premium elevator interior design",
  },
  {
    id: "retrofit-controls-what-changes",
    title: "Retrofit Controls: What Changes?",
    excerpt:
      "Key differences when migrating to modern controllers and what to plan for during cut-over.",
    content: "",
    tag: "Upgrades",
    date: "May 16, 2025",
    readTime: "6 min read",
    author: "Controls Engineering Team",
    imageSrc: "/illustrations/lift01.png",
    imageAlt: "Modern elevator control system",
  },
  {
    id: "energy-efficiency-modern-elevators",
    title: "Energy Efficiency in Modern Elevators",
    excerpt:
      "How regenerative drives and smart controls reduce energy consumption by up to 40% in commercial buildings.",
    content: "",
    tag: "Efficiency",
    date: "Apr 28, 2025",
    readTime: "5 min read",
    author: "Sustainability Team",
    imageSrc: "/illustrations/product01.png",
    imageAlt: "Energy-efficient elevator systems",
  },
  {
    id: "accessibility-compliance-guide",
    title: "Accessibility Compliance Guide",
    excerpt:
      "Essential requirements and best practices for making elevators accessible to all users.",
    content: "",
    tag: "Compliance",
    date: "Apr 15, 2025",
    readTime: "9 min read",
    author: "Compliance & Standards Team",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "Accessible elevator features",
  },
];

export default function BlogPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", isCurrentPage: true },
  ];

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
          <Breadcrumb items={breadcrumbItems} />

          <div className="max-w-3xl mt-10">
            <p className="text-sm font-semibold tracking-wide text-gray-500">
              Insights & Knowledge
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
              Elevating industry expertise
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Practical insights, technical guides, and industry perspectives on
              elevator technology, maintenance, and modernization from our
              expert team.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/#contact">
                <motion.button
                  className="btn btn-primary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare className="text-base" />
                  Get Expert Consultation
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  className="btn border-2 border-gray-200 bg-white/80 text-charcoal hover:bg-gray-50 hover:border-gray-300 backdrop-blur-sm transition-all duration-300 px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiEye className="text-base" />
                  View Services
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2 mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">
                Featured Articles
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Latest insights and expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts
              .filter((post) => post.featured)
              .slice(0, 2)
              .map((post) => (
                <FeaturedBlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  tag={post.tag}
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                  blogId={post.id}
                  imageSrc={post.imageSrc}
                  imageAlt={post.imageAlt}
                />
              ))}
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-12 md:py-16 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              All articles
            </h2>
            <p className="mt-2 text-gray-600">
              Browse our complete collection of technical guides and industry
              insights
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                tag={post.tag}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                blogId={post.id}
                imageSrc={post.imageSrc}
                imageAlt={post.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </main>
  );
}
