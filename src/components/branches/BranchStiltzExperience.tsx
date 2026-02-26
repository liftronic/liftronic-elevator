"use client";

import { motion } from "motion/react";
import type { StiltzExperience } from "~/sanity/lib/branchTypes";
import { GOA_STILTZ_EXPERIENCE } from "~/components/branches/goaFallbackData";

interface BranchStiltzExperienceProps {
  experience?: StiltzExperience;
  branchSlug?: string;
}

export default function BranchStiltzExperience({
  experience,
  branchSlug,
}: BranchStiltzExperienceProps) {
  const fallback = branchSlug === "goa" ? GOA_STILTZ_EXPERIENCE : undefined;
  const data = experience ?? fallback;

  if (!data?.intro && (!data?.experiences || data.experiences.length === 0)) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 md:mb-12"
        >
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl">
            Stiltz Experience
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
            {data.intro ||
              "Experience a premium home lift in person through live demos, design consultation, and technical walkthroughs with our branch experts."}
          </p>
        </motion.div>

        {data.experiences && data.experiences.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.experiences.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-60px" }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_14px_32px_rgba(17,24,39,0.1)] md:p-7"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-brand/85 to-brand/20" />

                <div className="mb-5 flex items-start justify-between">
                  <span className="text-4xl font-extrabold leading-none text-black/12 transition-colors duration-300 group-hover:text-brand/35 md:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                    Step
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug tracking-tight text-charcoal md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
