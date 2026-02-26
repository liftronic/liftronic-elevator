"use client";

import { motion } from "motion/react";
import {
  HiOutlineEye,
  HiOutlinePaintBrush,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";
import type { StiltzExperience } from "~/sanity/lib/branchTypes";
import { GOA_STILTZ_EXPERIENCE } from "~/components/branches/goaFallbackData";

const experienceIcons = [HiOutlineEye, HiOutlinePaintBrush, HiOutlineCog8Tooth];

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

  if (!data?.intro && (!data?.experiences || data.experiences.length === 0))
    return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Experience the Lift of Luxury –{" "}
            <span className="text-brand">Stiltz</span>
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full mb-6" />
          {data.intro && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {data.intro}
            </p>
          )}
        </motion.div>

        {/* Request a Private Experience */}
        {data.experiences && data.experiences.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-charcoal text-center mb-10"
            >
              Request a Private Experience
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {data.experiences.map((item, index) => {
                const Icon = experienceIcons[index % experienceIcons.length];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="bg-soft rounded-2xl p-8 text-center"
                  >
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10 mx-auto mb-5">
                      <Icon className="h-7 w-7 text-brand" />
                    </div>
                    <h4 className="text-lg font-bold text-charcoal mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
