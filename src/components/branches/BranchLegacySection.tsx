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
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-charcoal md:text-4xl">
              {data.title ?? "Our Legacy in Motion"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
              Crafted with local insight, elevated by precision engineering,
              and delivered with long-term support.
            </p>

            <div className="mt-8 flex gap-5">
              <div className="w-1 shrink-0 rounded-full bg-brand/60" />
              <p className="text-lg leading-[1.85] text-gray-600 md:text-xl">
                {data.body}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
