"use client";

import { motion } from "motion/react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineWrenchScrewdriver,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import type { WhyChooseReason } from "~/sanity/lib/branchTypes";
import { GOA_WHY_CHOOSE_REASONS } from "~/components/branches/goaFallbackData";

const icons = [
  HiOutlineBuildingOffice2,
  HiOutlineWrenchScrewdriver,
  HiOutlineShieldCheck,
];

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
    <section className="py-16 md:py-24 bg-soft">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Why Choose Liftronic {city ?? ""}?
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.map((reason, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white rounded-2xl p-8 shadow-md text-center"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-accent/10 mx-auto mb-6">
                  <Icon className="h-8 w-8 text-brand" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
