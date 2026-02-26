"use client";

import { motion } from "motion/react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";
import type { BranchConsultant } from "~/sanity/lib/branchTypes";
import {
  GOA_CLOSING_QUOTE,
  GOA_CONSULTANT,
  GOA_QUOTE_EMAIL,
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
  const quoteContact = email ?? person?.email;

  if (!person && !email && !quote) return null;

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[#071812]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(42,227,148,0.25),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(42,227,148,0.12),transparent_50%),linear-gradient(130deg,#071812_10%,#0d221a_55%,#091713_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-6 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-70px" }}
          className="relative overflow-hidden rounded-3xl border border-white/18 bg-white/8 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Speak to consultant
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl xl:whitespace-nowrap">
              Get your expert guidelines for the project
            </h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
              <div>
                {person?.name && (
                  <div className="rounded-2xl border border-white/15 bg-black/15 px-5 py-5 md:px-6 md:py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Your consultant
                    </p>
                    <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                      {person.name}
                    </h3>
                    {person.position && (
                      <p className="mt-1 text-sm text-white/65">{person.position}</p>
                    )}
                    <div className="mt-5 space-y-3">
                      {person.phone && (
                        <a
                          href={`tel:${person.phone.replace(/\s/g, "")}`}
                          className="group flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-accent/45 hover:bg-accent/15"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/12">
                            <HiOutlinePhone className="h-4 w-4 text-accent" />
                          </span>
                          {person.phone}
                        </a>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="group flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-accent/45 hover:bg-accent/15"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-accent/12">
                            <HiOutlineEnvelope className="h-4 w-4 text-accent" />
                          </span>
                          <span className="break-all">{person.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {(quoteContact || quote) && (
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 px-5 py-6 md:px-6 md:py-7">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-3 top-0 text-[6rem] font-extrabold leading-none text-white/8 select-none"
                    >
                      &ldquo;
                    </span>
                    {quoteContact && (
                      <p className="relative text-sm text-white/60">
                        Quote requests:{" "}
                        <a
                          href={`mailto:${quoteContact}`}
                          className="font-semibold text-accent transition-colors hover:text-white"
                        >
                          {quoteContact}
                        </a>
                      </p>
                    )}
                    {quote && (
                      <blockquote className="relative mt-3 text-xl leading-snug text-white md:text-2xl">
                        {quote}
                      </blockquote>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
