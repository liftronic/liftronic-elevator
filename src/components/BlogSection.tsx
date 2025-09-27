"use client";
import { motion } from "motion/react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
};

const posts: Post[] = [
  {
    id: "1",
    title: "Modernization: Elevators That Age Gracefully",
    excerpt:
      "From controllers to door upgrades — how to extend lifespan and improve ride quality without full replacement.",
    tag: "Modernization",
    date: "Aug 12, 2025",
  },
  {
    id: "2",
    title: "Safety Checklist: Residential Buildings",
    excerpt:
      "A quick checklist facility managers can use monthly to keep passengers safe and downtime low.",
    tag: "Safety",
    date: "Jul 28, 2025",
  },
  {
    id: "3",
    title: "Machine-Room-Less (MRL) vs. Conventional",
    excerpt:
      "Space, efficiency, and maintenance factors when choosing between MRL and conventional systems.",
    tag: "Guides",
    date: "Jul 10, 2025",
  },
  {
    id: "4",
    title: "Predictive Maintenance Basics",
    excerpt:
      "Sensors, runtime logs, and when to schedule service — the fundamentals of predictive upkeep.",
    tag: "Maintenance",
    date: "Jun 22, 2025",
  },
  {
    id: "5",
    title: "Aesthetics: Cab Interiors That Last",
    excerpt:
      "Materials, lighting, and touchpoints that balance durability with a premium look.",
    tag: "Design",
    date: "Jun 3, 2025",
  },
  {
    id: "6",
    title: "Retrofit Controls: What Changes?",
    excerpt:
      "Key differences when migrating to modern controllers and what to plan for during cut-over.",
    tag: "Upgrades",
    date: "May 16, 2025",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-white/60 border-y border-black/5">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Insights & Updates
            </h2>
            <p className="mt-2 text-sm opacity-80 max-w-[60ch]">
              Practical tips and perspectives on elevators, modernization, and
              maintenance.
            </p>
          </div>
          <Link href="#contact">
            <motion.button
              className="btn btn-primary px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.button>
          </Link>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: idx * 0.05,
                duration: 0.45,
                ease: "easeOut",
              }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-black/10 bg-white overflow-hidden"
            >
              {/* Visual */}
              <div className="relative h-40">
                <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_20%,rgba(42,227,148,0.25),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50" />
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-emerald-200/60 bg-emerald-50 text-emerald-900 px-2 py-0.5 text-[11px] font-semibold tracking-wide">
                    {p.tag}
                  </span>
                  <span className="text-[11px] text-neutral-500">{p.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm opacity-80">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-emerald-800 font-semibold text-sm">
                  Read more
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="translate-x-0 group-hover:translate-x-0.5 transition-transform"
                  >
                    <path
                      d="M7 12h10M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
