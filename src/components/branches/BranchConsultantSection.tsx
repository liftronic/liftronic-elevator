"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
} from "react-icons/hi2";
import type { BranchConsultant } from "~/sanity/lib/branchTypes";

interface BranchConsultantSectionProps {
  consultant?: BranchConsultant;
  quoteEmail?: string;
  closingQuote?: string;
  branchSlug?: string;
  /** Photo URL from contactPerson.photo.asset.url (used for Goa card) */
  photoUrl?: string;
  /** Branch description / consultant bio */
  bio?: string;
  /** Branch city name */
  city?: string;
  /** Contact person phone (used for Goa card) */
  contactPhone?: string;
  /** Contact person email (used for Goa card) */
  contactEmail?: string;
  bgVariant?: "white" | "soft";
}

export default function BranchConsultantSection({
  consultant,
  quoteEmail,
  closingQuote,
  branchSlug,
  photoUrl,
  bio,
  city,
  contactPhone,
  contactEmail,
  bgVariant = "soft",
}: BranchConsultantSectionProps) {
  const isGoa = branchSlug === "goa";
  const person = consultant;
  const email = quoteEmail;
  const quote = closingQuote;
  const quoteContact = email ?? person?.email;

  if (!person && !email && !quote) return null;

  /* ── Goa variant: light editorial card with person photo ── */
  if (isGoa) {
    return (
      <section className={`bg-${bgVariant} py-10 md:py-16`}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-70px" }}
            className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_16px_60px_rgba(17,24,39,0.07)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
              {/* ── Left: text content ── */}
              <div className="px-8 py-10 md:px-12 md:py-14">
                {/* Section title */}
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-charcoal md:text-4xl lg:text-5xl">
                  Speak to our consultant
                </h2>
                {/* Company + branch */}
                <p className="mt-4 text-base font-bold text-brand md:text-lg">
                  Liftronic Homelifts Pvt. Ltd.
                </p>
                <p className="mt-2 text-xl font-bold text-charcoal">
                  {city ?? "Goa"} Branch
                </p>
                <div className="mt-3 h-[3px] w-10 rounded-full bg-brand" />

                {/* Person info */}
                {person?.name && (
                  <div className="mt-7">
                    <p className="text-lg font-bold text-charcoal">
                      {person.name}
                    </p>
                    {person.position && (
                      <p className="mt-0.5 text-sm text-gray-500">
                        {person.position}
                      </p>
                    )}
                  </div>
                )}

                {/* Bio */}
                {bio && (
                  <div className="mt-5 max-w-xl space-y-3">
                    {bio.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-600 md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Contact row */}
                {(contactPhone ?? contactEmail ?? person?.phone ?? person?.email) && (
                  <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/8 pt-6">
                    {(contactPhone ?? person?.phone) && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Number:
                        </p>
                        <a
                          href={`tel:${(contactPhone ?? person?.phone)!.replace(/\s/g, "")}`}
                          className="mt-1 block text-base font-bold text-charcoal transition-colors hover:text-brand md:text-lg"
                        >
                          {contactPhone ?? person?.phone}
                        </a>
                      </div>
                    )}
                    {(contactEmail ?? person?.email) && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Email:
                        </p>
                        <a
                          href={`mailto:${contactEmail ?? person?.email}`}
                          className="mt-1 block break-all text-base font-bold text-charcoal transition-colors hover:text-brand md:text-lg"
                        >
                          {contactEmail ?? person?.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Right: photo with frame + dot pattern ── */}
              {photoUrl && (
                <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-soft/60 px-12 py-12 lg:min-h-0 lg:px-16 lg:py-14">
                  {/* Dot grid background */}
                  <div
                    aria-hidden
                    className="absolute inset-0 [background-image:radial-gradient(rgba(42,227,148,0.4)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
                  />

                  {/* Photo frame with offset green border */}
                  <div className="relative z-10">
                    {/* Offset green border (behind photo) */}
                    <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-brand/70" />

                    {/* Photo */}
                    <div className="relative h-72 w-56 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/8 md:h-80 md:w-64">
                      <Image
                        src={photoUrl}
                        alt={person?.name ?? "Branch Consultant"}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 224px, 256px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Default variant: dark themed section for all other branches ── */
  return (
    <section className="relative isolate overflow-hidden py-10 md:py-16">
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
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl xl:whitespace-nowrap">
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
                      className="pointer-events-none absolute right-3 top-0 select-none text-[6rem] font-extrabold leading-none text-white/8"
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
