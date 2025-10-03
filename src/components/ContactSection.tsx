"use client";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 scroll-mt-24 bg-soft border-y border-black/5 text-charcoal relative overflow-hidden">
      {/* decorative accent blobs */}
      <div className="absolute -left-16 top-10 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-blob" />
      <div className="absolute right-[-8%] bottom-10 -z-10 h-48 w-48 rounded-full bg-accent/6 blur-2xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
          className="flex flex-col h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-black/80">
            Have a project in mind? We&apos;d love to hear from you. Drop a message and we&apos;ll get back within 24 hours.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a href="tel:+911231231233" aria-label="Call +91 1231231233" className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="text-accent font-semibold text-base">+91 1231231233</div>
              <div className="text-xs text-black/70">Phone Support</div>
            </motion.a>
            <motion.a href="mailto:contact@liftronic.com" aria-label="Email contact@liftronic.com" className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="text-accent font-semibold text-base break-words whitespace-normal max-w-full">contact@liftronic.com</div>
              <div className="text-xs text-black/70">Email us</div>
            </motion.a>
          </div>

          <div className="mt-6 flex-1 min-h-[360px] rounded-2xl overflow-hidden shadow-xl border border-accent/10">
            <iframe
              src="https://maps.google.com/maps?q=Mumbai,Maharashtra,India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl bg-white/80 p-6 shadow-xl border border-accent/10 text-black relative overflow-hidden min-w-0 h-full">
            <iframe
              data-tally-src="https://tally.so/embed/mYNGlN?alignLeft=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="794"
              style={{ border: 0 }}
              title="Liftronic Elevator enquiry"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
