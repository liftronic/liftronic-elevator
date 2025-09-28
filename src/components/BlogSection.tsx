import * as motion from "motion/react-client";
import BlogCard from "~/components/blog/BlogCard";
import QuoteCTA from "~/components/QuoteCTA";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc?: string;
  imageAlt?: string;
};

const featuredBlogs: BlogPost[] = [
  {
    id: "modernization-elevators-age-gracefully",
    title: "Modernization: Elevators That Age Gracefully",
    excerpt:
      "From controllers to door upgrades — how to extend lifespan and improve ride quality without full replacement.",
    tag: "Modernization",
    date: "Aug 12, 2025",
    readTime: "5 min read",
    author: "Liftronic Engineering Team",
    imageSrc: "/assets/service_banner.png",
    imageAlt: "Elevator modernization process",
  },
  {
    id: "safety-checklist-residential-buildings",
    title: "Safety Checklist: Residential Buildings",
    excerpt:
      "A comprehensive checklist facility managers can use monthly to keep passengers safe and downtime low.",
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
    tag: "Guides",
    date: "Jul 10, 2025",
    readTime: "6 min read",
    author: "Technical Advisory Team",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "MRL elevator system comparison",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-soft">
      <div className="container mx-auto px-4">
        {/* Header section matching Products section typography */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-md md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            Stay updated with our latest articles on elevator technology, safety
            practices, and industry insights from our team of experts.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {featuredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              tag={blog.tag}
              date={blog.date}
              readTime={blog.readTime}
              author={blog.author}
              blogId={blog.id}
              imageSrc={blog.imageSrc}
              imageAlt={blog.imageAlt}
            />
          ))}
        </motion.div>

        {/* Quote and CTA Section */}
        <QuoteCTA
          quote="Sharing knowledge to elevate the entire industry."
          ctaText="See All Blogs"
          ctaHref="/blogs"
        />
      </div>
    </section>
  );
}
