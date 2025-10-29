"use client";
import { motion } from "motion/react";
import { ContactInfo } from "~/../typings";
import ContactForm from "~/components/ContactForm";

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
  productOptions?: string[];
}

export default function ContactSection({
  contactInfo,
  productOptions = [
    "Passenger Elevator",
    "Freight Elevator",
    "Home Elevator",
    "Hospital Elevator",
    "Capsule Elevator",
    "Escalator",
    "Moving Walkway",
    "Other",
  ],
}: ContactSectionProps) {
  // Fallback data in case Sanity data is not available
  const fallbackContactInfo = {
    supportPhone: "+91 1231231233",
    email: "contact@liftronic.com",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6055.296953768451!2d72.98504085482219!3d19.2636486625117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bb966bcb6509%3A0x113927aa64c635b4!2sLiftronic%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1761726182478!5m2!1sen!2sin",
  };

  const contact = contactInfo || fallbackContactInfo;

  return (
    <section
      id="contact"
      className="py-20 scroll-mt-24 bg-white border-y border-black/5 text-charcoal relative overflow-hidden"
    >
      {/* decorative accent blobs */}
      <div className="absolute -left-16 top-10 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-blob" />
      <div className="absolute right-[-8%] bottom-10 -z-10 h-48 w-48 rounded-full bg-accent/6 blur-2xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-stretch">
        {/* Contact Info & Map - appears first on desktop (order-1), second on mobile (order-2) */}
        <motion.div
          className="flex flex-col h-full order-2 lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-black/80">
            Have a project in mind? We&apos;d love to hear from you. Drop a
            message and we&apos;ll get back within 24 hours.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
              aria-label={`Call ${contact.supportPhone}`}
              className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-accent font-semibold text-base">
                {contact.supportPhone}
              </div>
              <div className="text-xs text-black/70">Phone Support</div>
            </motion.a>
            <motion.a
              href={`mailto:${contact.email}`}
              aria-label={`Email ${contact.email}`}
              className="p-4 rounded-2xl bg-white/80 shadow-xl border border-accent/10 transition-all cursor-pointer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-accent font-semibold text-base break-words whitespace-normal max-w-full">
                {contact.email}
              </div>
              <div className="text-xs text-black/70">Email us</div>
            </motion.a>
          </div>

          <div className="mt-6 flex-1 min-h-[360px] rounded-2xl overflow-hidden shadow-xl border border-accent/10">
            <iframe
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* Contact Form - appears second on desktop (order-2), first on mobile (order-1) */}
        <motion.div
          className="min-w-0 order-1 lg:order-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl bg-white/80 p-6 shadow-xl border border-accent/10 text-black">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a message
            </h3>
            <ContactForm productOptions={productOptions} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
