"use client";

import { motion } from "motion/react";
import ContactForm from "~/components/ContactForm";
import type { Branch } from "~/sanity/lib/branchTypes";

interface BranchGoaContactFormProps {
  branch: Branch;
  productOptions: string[];
}

export default function BranchGoaContactForm({
  branch,
  productOptions,
}: BranchGoaContactFormProps) {
  // All contact data sourced from Sanity — bookingSection takes priority over branch-level fields
  const phone = branch.bookingSection?.conciergePhone ?? branch.phone;
  const email = branch.quoteEmail ?? branch.email;

  // Build a Google Maps embed from the branch address stored in Sanity
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`;

  return (
    <section
      id="goa-contact"
      className="relative overflow-hidden border-y border-black/5 bg-white py-20 text-charcoal scroll-mt-24"
    >
      {/* Decorative accent blobs — matches ContactSection */}
      <div className="absolute -left-16 top-10 -z-10 h-56 w-56 animate-blob rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 right-[-8%] -z-10 h-48 w-48 rounded-full bg-accent/6 blur-2xl" />

      <div className="container mx-auto grid items-stretch gap-12 px-4 lg:grid-cols-2">
        {/* ── Left: info + map ── */}
        <motion.div
          className="order-2 flex h-full flex-col lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-semibold text-black md:text-5xl">
            Request a Quote
          </h2>
          <p className="mt-4 text-lg text-black/80">
            Have a project in mind? Our {branch.city} team would love to hear
            from you. Drop a message and we&apos;ll get back within 24 hours.
          </p>

          {/* Phone + Email cards — same styling as ContactSection */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.a
              href={`tel:${phone.replace(/\s/g, "")}`}
              aria-label={`Call ${phone}`}
              className="cursor-pointer rounded-2xl border border-accent/10 bg-white/80 p-4 shadow-xl transition-all"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-base font-semibold text-accent">{phone}</div>
              <div className="text-xs text-black/70">Phone Support</div>
            </motion.a>
            <motion.a
              href={`mailto:${email}`}
              aria-label={`Email ${email}`}
              className="cursor-pointer rounded-2xl border border-accent/10 bg-white/80 p-4 shadow-xl transition-all"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="max-w-full break-words whitespace-normal text-base font-semibold text-accent">
                {email}
              </div>
              <div className="text-xs text-black/70">Email us</div>
            </motion.a>
          </div>

          {/* Map embed built from branch address in Sanity */}
          <div className="mt-6 min-h-[360px] flex-1 overflow-hidden rounded-2xl border border-accent/10 shadow-xl">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${branch.name} Location`}
            />
          </div>
        </motion.div>

        {/* ── Right: form card ── */}
        <motion.div
          className="order-1 min-w-0 lg:order-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-accent/10 bg-white/80 p-6 text-black shadow-xl">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Send us a message
            </h3>
            <ContactForm productOptions={productOptions} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
