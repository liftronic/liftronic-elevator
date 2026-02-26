"use client";

import { motion } from "motion/react";
import {
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import type { BookingSection } from "~/sanity/lib/branchTypes";
import { GOA_BOOKING_SECTION } from "~/components/branches/goaFallbackData";

interface BranchBookVisitProps {
  booking?: BookingSection;
  branchSlug?: string;
}

export default function BranchBookVisit({
  booking,
  branchSlug,
}: BranchBookVisitProps) {
  const fallback = branchSlug === "goa" ? GOA_BOOKING_SECTION : undefined;
  const data = booking ?? fallback;

  if (!data) return null;

  return (
    <section className="py-16 md:py-24 bg-brand text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <HiOutlineCalendarDays className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Visit Today
          </h2>
          <div className="inline-block h-1 w-16 bg-accent rounded-full mb-6" />
          {data.description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Concierge Phone */}
          {data.conciergePhone && (
            <motion.a
              href={`tel:${data.conciergePhone.replace(/\s/g, "")}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-accent/20">
                <HiOutlinePhone className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/60 font-medium mb-1">
                  Call our concierge
                </p>
                <p className="text-lg font-bold">{data.conciergePhone}</p>
              </div>
            </motion.a>
          )}

          {/* Visit Address */}
          {data.visitAddress && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white/10 rounded-2xl p-6"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-accent/20">
                <HiOutlineMapPin className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-sm text-white/60 font-medium mb-1">
                  Location
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {data.visitAddress}
                </p>
                {data.gpsLink && (
                  <a
                    href={data.gpsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:text-white text-sm font-semibold mt-2 transition-colors"
                  >
                    <span>Open in Maps</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
