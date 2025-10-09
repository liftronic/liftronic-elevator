"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ContactInfo } from "~/../typings";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

// Extend Window interface for Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
      config?: Record<string, unknown>;
    };
  }
}

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
}

export default function ContactSection({ contactInfo }: ContactSectionProps) {
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState(false);

  // Fallback data in case Sanity data is not available
  const fallbackContactInfo = {
    supportPhone: "+91 1231231233",
    email: "contact@liftronic.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Mumbai,Maharashtra,India&output=embed",
  };

  const contact = contactInfo || fallbackContactInfo;

  // Load Tally embed script and reinitialize on mount
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let verifyTimeoutId: NodeJS.Timeout;

    const initializeTallyForm = () => {
      if (window.Tally && typeof window.Tally.loadEmbeds === "function") {
        try {
          window.Tally.loadEmbeds();

          // Give more time for the iframe to load - verify after 5 seconds
          verifyTimeoutId = setTimeout(() => {
            const iframe = document.querySelector("iframe[data-tally-src]");
            const iframeSrc = iframe ? (iframe as HTMLIFrameElement).src : null;

            // Check if iframe has actually loaded content
            if (!iframe || !iframeSrc || iframeSrc === "about:blank") {
              console.warn("Tally iframe failed to load properly");
              setFormError(true);
            } else {
              // Iframe exists with valid src, consider it loaded
              setFormLoaded(true);
            }
          }, 5000);
        } catch (error) {
          console.error("Error initializing Tally:", error);
          setFormError(true);
        }
      } else {
        // Retry if Tally is not ready yet, but don't retry forever
        const retryCount =
          (window as { __tallyRetryCount?: number }).__tallyRetryCount || 0;
        if (retryCount < 10) {
          (window as { __tallyRetryCount?: number }).__tallyRetryCount =
            retryCount + 1;
          timeoutId = setTimeout(initializeTallyForm, 500);
        } else {
          console.error("Tally failed to load after multiple retries");
          setFormError(true);
        }
      }
    };

    const existingScript = document.querySelector(
      'script[src*="tally.so/widgets/embed.js"]'
    );

    if (existingScript) {
      // Script already loaded, reinitialize the form
      initializeTallyForm();
    } else {
      // Load script for the first time
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;

      script.onload = () => {
        setTimeout(initializeTallyForm, 300);
      };

      script.onerror = () => {
        console.error("Failed to load Tally script");
        setFormError(true);
      };

      document.body.appendChild(script);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (verifyTimeoutId) {
        clearTimeout(verifyTimeoutId);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      className="py-20 scroll-mt-24 bg-soft border-y border-black/5 text-charcoal relative overflow-hidden"
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
          <div className="rounded-2xl bg-white/80 p-6 shadow-xl border border-accent/10 text-black relative overflow-hidden min-w-0 h-full min-h-[600px]">
            {/* Loading State */}
            {!formLoaded && !formError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-4"></div>
                  <p className="text-gray-600">Loading contact form...</p>
                </div>
              </div>
            )}

            {/* Error State / Fallback */}
            {formError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-soft z-10 rounded-2xl">
                <div className="w-full max-w-md px-6 py-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                      <FiMessageSquare className="text-3xl text-accent" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                      Get in Touch
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Having trouble loading the form? No worries! You can reach
                      us directly through any of these options:
                    </p>
                  </div>

                  {/* Contact Options */}
                  <div className="space-y-3 mb-8">
                    <a
                      href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <FiPhone className="text-accent text-lg" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                          Call us
                        </div>
                        <div className="font-semibold text-gray-900 truncate">
                          {contact.supportPhone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <FiMail className="text-accent text-lg" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                          Email us
                        </div>
                        <div className="font-semibold text-gray-900 truncate">
                          {contact.email}
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <a
                      href="https://tally.so/r/mYNGlN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 btn btn-primary w-full sm:w-auto px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl"
                    >
                      <span>Open Form in New Tab</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tally Form Iframe */}
            <iframe
              data-tally-src="https://tally.so/embed/mYNGlN?alignLeft=1&transparentBackground=1&dynamicHeight=1"
              loading="eager"
              width="100%"
              height="794"
              style={{ border: 0, minHeight: "600px" }}
              title="Liftronic Elevator enquiry"
              onLoad={(e) => {
                // Check if iframe actually has content loaded
                const iframe = e.target as HTMLIFrameElement;
                if (iframe && iframe.src && iframe.src !== "about:blank") {
                  setFormLoaded(true);
                  setFormError(false);
                }
              }}
              onError={() => {
                console.error("Tally iframe failed to load");
                setFormError(true);
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
