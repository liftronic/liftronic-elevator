import * as motion from "motion/react-client";
import BlogCard from "~/components/blog/BlogCard";
import QuoteCTA from "~/components/QuoteCTA";
import type { BlogPost } from "~/sanity/lib/blogTypes";

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  if (blogs.length === 0) {
    return null;
  }

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
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              tag={blog.tag}
              author=""
              blogId={blog.slug}
              imageSrc={blog.mainImage}
              imageAlt={blog.imageAlt}
              blurDataURL={blog.mainImageLqip}
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
