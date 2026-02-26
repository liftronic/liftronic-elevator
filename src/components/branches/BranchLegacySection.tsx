"use client";

import { motion } from "motion/react";
import type { LegacySection } from "~/sanity/lib/branchTypes";
import { GOA_LEGACY_SECTION } from "~/components/branches/goaFallbackData";

interface BranchLegacySectionProps {
  legacy?: LegacySection;
  branchSlug?: string;
}

export default function BranchLegacySection({
  legacy,
  branchSlug,
}: BranchLegacySectionProps) {
  const fallback = branchSlug === "goa" ? GOA_LEGACY_SECTION : undefined;
  const data = legacy ?? fallback;

  if (!data?.body) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {data.title ?? "Our Legacy in Motion"}
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {data.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
