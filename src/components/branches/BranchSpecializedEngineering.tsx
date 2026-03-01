"use client";

import { motion } from "motion/react";
import { HiCheckCircle } from "react-icons/hi2";
import type { SpecializedEngineeringSection } from "~/sanity/lib/branchTypes";
import { GOA_SPECIALIZED_ENGINEERING } from "~/components/branches/goaFallbackData";

interface BranchSpecializedEngineeringProps {
  sections?: SpecializedEngineeringSection[];
  branchSlug?: string;
}

function getGridColumnsClass(count: number): string {
  if (count === 2) return "md:grid-cols-2";
  if (count === 3) return "md:grid-cols-3";
  if (count === 4) return "md:grid-cols-2";
  return "md:grid-cols-2";
}

export default function BranchSpecializedEngineering({
  sections,
  branchSlug,
}: BranchSpecializedEngineeringProps) {
  const fallback =
    branchSlug === "goa" ? GOA_SPECIALIZED_ENGINEERING : undefined;
  const data = sections && sections.length > 0 ? sections : fallback;

  if (!data || data.length === 0) return null;

  const gridColumnsClass = getGridColumnsClass(data.length);

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
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl">
            {branchSlug === "goa"
              ? "Specialized Engineering: Beyond the Standard"
              : "Built for complex environments"}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            {branchSlug === "goa"
              ? "While we specialize in home luxury, Liftronic Homelifts Pvt. Ltd., provides advanced vertical engineering solutions which are not just industrial products – they are problem solvers for unique landscapes and safety requirements."
              : "We support specialized vertical mobility projects where terrain, regulations, or safety conditions require custom engineering."}
          </p>
        </motion.div>

        <div className={`grid gap-5 ${gridColumnsClass}`}>
          {data.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_14px_32px_rgba(17,24,39,0.1)] md:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/80 to-brand/20" />

              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="text-4xl font-extrabold leading-none text-black/12 transition-colors duration-300 group-hover:text-brand/35 md:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Specialist
                </span>
              </div>

              <div className="flex-1 md:min-h-[170px]">
                <h3 className="text-xl font-bold leading-snug tracking-tight text-charcoal md:text-2xl">
                  {section.title}
                </h3>
                {section.subtitle && (
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                    {section.subtitle}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
                  {section.description}
                </p>
              </div>

              {section.features && section.features.length > 0 && (
                <ul className="mt-4 space-y-3 border-t border-black/8 pt-4">
                  {section.features.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                      <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <div>
                        <h4 className="text-sm font-bold text-charcoal">
                          {feature.title}
                        </h4>
                        {feature.description && (
                          <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
