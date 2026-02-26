"use client";

import { motion } from "motion/react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import type { SpecializedEngineeringSection } from "~/sanity/lib/branchTypes";
import { GOA_SPECIALIZED_ENGINEERING } from "~/components/branches/goaFallbackData";

interface BranchSpecializedEngineeringProps {
  sections?: SpecializedEngineeringSection[];
  branchSlug?: string;
}

export default function BranchSpecializedEngineering({
  sections,
  branchSlug,
}: BranchSpecializedEngineeringProps) {
  const fallback =
    branchSlug === "goa" ? GOA_SPECIALIZED_ENGINEERING : undefined;
  const data = sections && sections.length > 0 ? sections : fallback;

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
            Specialized Engineering: Beyond the Standard
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            While we specialize in home luxury, Liftronic Homelifts Pvt. Ltd.
            provides advanced vertical engineering solutions which are not just
            industrial products – they are problem solvers for unique landscapes
            and safety requirements.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {data.map((section, sIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sIndex * 0.15 }}
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {section.title}
                </h3>
                {section.subtitle && (
                  <p className="text-brand font-semibold mb-4">
                    {section.subtitle}
                  </p>
                )}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {section.description}
                </p>

                {section.features && section.features.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-3 bg-soft rounded-xl p-5"
                      >
                        <HiOutlineCheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-charcoal mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
