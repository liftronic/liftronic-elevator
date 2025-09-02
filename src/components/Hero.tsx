"use client";
import { motion } from "motion/react";

export default function Hero() {
  const handleScroll = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          src="/assets/sample_1.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/sample_1.mp4"
        />
        {/* Darken for contrast */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_20%_30%,rgba(42,227,148,0.18),transparent_60%)]" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex items-center justify-start">
        {/* Left: Messaging */}
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] tracking-wide text-white/90"
          >
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            Elevators • Lifts • Modernization
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-5xl sm:text-6xl md:text-7xl leading-tight font-extrabold text-white tracking-tight"
          >
            Premium
            <span className="mx-3 bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              Lift Solutions
            </span>
            for Every Building
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-5 text-lg md:text-2xl text-white/90 max-w-[46ch]"
          >
            Design, installation, and maintenance engineered for precision,
            safety, and seamless passenger experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-3 justify-start"
          >
            <a href="#contact" className="btn btn-primary">
              Get a Quote
            </a>
            <a href="#services" className="btn btn-ghost">
              View Services
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-6 text-sm text-white/70"
          >
            Trusted by residential, commercial, and industrial projects.
          </motion.p>
        </div>

        {/* Scroll cue (clickable) */}
        <button
          type="button"
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-2 py-1 hover:text-white transition"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center">
            <span>Scroll</span>
            <svg
              className="mt-1 animate-bounce"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}
