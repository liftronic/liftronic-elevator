"use client";

import { motion } from "motion/react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import type { BookingSection } from "~/sanity/lib/branchTypes";

interface BranchBookVisitProps {
  booking?: BookingSection;
}

export default function BranchBookVisit({
  booking,
}: BranchBookVisitProps) {
  const data = booking;

  if (!data) return null;

  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8"
        >
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-charcoal md:text-5xl xl:whitespace-nowrap">
            Book your visit to the experience center
          </h2>
          {data.description && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
              {data.description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {data.conciergePhone && (
            <a
              href={`tel:${data.conciergePhone.replace(/\s/g, "")}`}
              className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all hover:-translate-y-0.5 hover:border-brand/35"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/5 transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
                <HiOutlinePhone className="h-5 w-5 text-brand" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Concierge Phone
                </p>
                <p className="mt-0.5 text-lg font-bold text-charcoal transition-colors group-hover:text-brand">
                  {data.conciergePhone}
                </p>
              </div>
            </a>
          )}

          {data.visitAddress && (
            <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] transition-all hover:-translate-y-0.5 hover:border-brand/35">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/5">
                <HiOutlineMapPin className="h-5 w-5 text-brand" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Visit Address
                </p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                  {data.visitAddress}
                </p>
                {data.gpsLink && (
                  <a
                    href={data.gpsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-charcoal"
                  >
                    Open in Maps
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
