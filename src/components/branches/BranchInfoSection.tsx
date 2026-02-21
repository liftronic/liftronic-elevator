"use client";

import { motion } from "motion/react";
import { HiMapPin, HiPhone, HiEnvelope } from "react-icons/hi2";
import type { Branch } from "~/sanity/lib/branchTypes";
import ContactPersonCard from "./ContactPersonCard";

interface BranchInfoSectionProps {
  branch: Branch;
}

export default function BranchInfoSection({ branch }: BranchInfoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                    <HiMapPin className="h-6 w-6 text-brand" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    Address
                  </h3>
                  <p className="text-gray-600">{branch.address}</p>
                  {branch.mapUrl && (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline text-sm mt-2 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                    <HiPhone className="h-6 w-6 text-brand" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    Phone
                  </h3>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-gray-600 hover:text-brand transition-colors"
                  >
                    {branch.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                    <HiEnvelope className="h-6 w-6 text-brand" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${branch.email}`}
                    className="text-gray-600 hover:text-brand transition-colors break-all"
                  >
                    {branch.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Person */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
              Branch Manager
            </h2>
            <div className="bg-soft rounded-lg p-8">
              <ContactPersonCard person={branch.contactPerson} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
