"use client";

import { motion } from "motion/react";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import type { BranchConsultant } from "~/sanity/lib/branchTypes";
import {
  GOA_CONSULTANT,
  GOA_QUOTE_EMAIL,
  GOA_CLOSING_QUOTE,
} from "~/components/branches/goaFallbackData";

interface BranchConsultantSectionProps {
  consultant?: BranchConsultant;
  quoteEmail?: string;
  closingQuote?: string;
  branchSlug?: string;
}

export default function BranchConsultantSection({
  consultant,
  quoteEmail,
  closingQuote,
  branchSlug,
}: BranchConsultantSectionProps) {
  const isGoa = branchSlug === "goa";
  const person = consultant ?? (isGoa ? GOA_CONSULTANT : undefined);
  const email = quoteEmail ?? (isGoa ? GOA_QUOTE_EMAIL : undefined);
  const quote = closingQuote ?? (isGoa ? GOA_CLOSING_QUOTE : undefined);

  if (!person && !email && !quote) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Consultant Card */}
          {person?.name && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-80px" }}
              className="bg-soft rounded-2xl p-8 md:p-10 mb-10"
            >
              <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">
                Speak with our Consultant
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-accent/10">
                  <HiOutlineUserCircle className="h-12 w-12 text-brand" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold text-charcoal">
                    {person.name}
                  </p>
                  {person.position && (
                    <p className="text-brand font-semibold mb-3">
                      {person.position}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {person.phone && (
                      <a
                        href={`tel:${person.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-brand transition-colors"
                      >
                        <HiOutlinePhone className="h-5 w-5" />
                        <span className="text-sm">{person.phone}</span>
                      </a>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-brand transition-colors"
                      >
                        <HiOutlineEnvelope className="h-5 w-5" />
                        <span className="text-sm">{person.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Request a Quote */}
          {email && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-gray-600 mb-2">Request a quote:</p>
              <a
                href={`mailto:${email}`}
                className="text-brand font-bold text-lg hover:text-accent transition-colors"
              >
                {email}
              </a>
            </motion.div>
          )}

          {/* Closing Quote */}
          {quote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block h-1 w-16 bg-accent rounded-full mb-6" />
              <blockquote className="text-xl md:text-2xl font-semibold text-charcoal italic leading-relaxed max-w-3xl mx-auto">
                {quote}
              </blockquote>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
