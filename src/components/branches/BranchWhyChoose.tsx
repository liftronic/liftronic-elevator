"use client";

import { motion } from "motion/react";
import type { WhyChooseReason } from "~/sanity/lib/branchTypes";
import { GOA_WHY_CHOOSE_REASONS } from "~/components/branches/goaFallbackData";

interface BranchWhyChooseProps {
  reasons?: WhyChooseReason[];
  city?: string;
  branchSlug?: string;
}

export default function BranchWhyChoose({
  reasons,
  city,
  branchSlug,
}: BranchWhyChooseProps) {
  const fallback = branchSlug === "goa" ? GOA_WHY_CHOOSE_REASONS : undefined;
  const data = reasons && reasons.length > 0 ? reasons : fallback;

  if (!data || data.length === 0) return null;

  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 md:mb-12"
        >
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl">
            {branchSlug === "goa" ? (
              <>
                Why choose{" "}
                <span className="text-brand">Liftronic Goa</span>?
              </>
            ) : (
              <>
                Why homeowners choose our{" "}
                <span className="text-brand">{city ?? "local"}</span> branch
              </>
            )}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Precision-crafted solutions designed for architectural character,
            daily comfort, and trusted local support.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_14px_32px_rgba(17,24,39,0.09)] md:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/80 to-brand/20" />

              <div className="mb-4">
                <span className="text-3xl font-extrabold leading-none tracking-tight text-black/15 transition-colors duration-300 group-hover:text-brand/35 md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-lg font-bold leading-snug tracking-tight text-charcoal md:text-xl">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                {reason.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
