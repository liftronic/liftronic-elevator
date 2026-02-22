"use client";

import { motion } from "motion/react";
import { HiMapPin, HiPhone, HiEnvelope } from "react-icons/hi2";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchInfoSectionProps {
  branch: Branch;
}

export default function BranchInfoSection({ branch }: BranchInfoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-soft">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Contact Information
            </h2>
            <div className="inline-block h-1 w-16 bg-accent rounded-full" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="space-y-8">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10">
                    <HiMapPin className="h-7 w-7 text-brand" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {branch.address}
                  </p>
                  {branch.mapUrl && (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand hover:text-accent transition-colors text-sm font-semibold mt-3"
                    >
                      <span>View on Google Maps</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10">
                    <HiPhone className="h-7 w-7 text-brand" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-gray-600 hover:text-brand transition-colors text-lg"
                  >
                    {branch.phone}
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10">
                    <HiEnvelope className="h-7 w-7 text-brand" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${branch.email}`}
                    className="text-gray-600 hover:text-brand transition-colors break-all"
                  >
                    {branch.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
