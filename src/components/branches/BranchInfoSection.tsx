"use client";

import { motion } from "motion/react";
import { HiEnvelope, HiMapPin, HiPhone } from "react-icons/hi2";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchInfoSectionProps {
  branch: Branch;
  bgVariant?: "white" | "soft";
}

export default function BranchInfoSection({
  branch,
  bgVariant = "white",
}: BranchInfoSectionProps) {
  return (
    <section
      className={`${bgVariant === "soft" ? "bg-soft" : "bg-white"} py-16 md:py-24`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl">
            Plan your visit or consultation
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Reach the branch directly for directions, assistance, and
            consultation requests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Address */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-40px" }}
            className="group rounded-2xl border border-black/10 bg-soft p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 md:p-6"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 bg-brand/5 transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
              <HiMapPin className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-400">
              Address
            </h3>
            <p className="mt-2 text-base leading-relaxed text-charcoal md:text-[1.05rem]">
              {branch.address}
            </p>
            {branch.mapUrl && (
              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-charcoal"
              >
                Open in Google Maps →
              </a>
            )}
          </motion.article>

          {/* Phone */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 }}
            viewport={{ once: true, margin: "-40px" }}
            className="group rounded-2xl border border-black/10 bg-soft p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 md:p-6"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 bg-brand/5 transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
              <HiPhone className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-400">
              Phone
            </h3>
            <a
              href={`tel:${branch.phone}`}
              className="mt-2 inline-block text-base font-medium text-charcoal transition-colors hover:text-brand md:text-[1.05rem]"
            >
              {branch.phone}
            </a>
          </motion.article>

          {/* Email */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            viewport={{ once: true, margin: "-40px" }}
            className="group rounded-2xl border border-black/10 bg-soft p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 md:p-6"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-brand/20 bg-brand/5 transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
              <HiEnvelope className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-400">
              Email
            </h3>
            <a
              href={`mailto:${branch.email}`}
              className="mt-2 inline-block break-all text-base font-medium text-charcoal transition-colors hover:text-brand md:text-[1.05rem]"
            >
              {branch.email}
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
