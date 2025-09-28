"use client";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useSmoothScroll } from "~/hooks/useSmoothScroll";
import { FiHeadphones, FiMail, FiPhoneCall, FiMessageSquare, FiEye } from "react-icons/fi";
import { Social } from "~/../typings";
import { getIcon } from "~/sanity/utils/iconMapper";

interface HeroProps {
  socials: Social[];
}

export default function Hero({ socials }: HeroProps) {
  const { scrollTo } = useSmoothScroll();
  useEffect(() => {
    const v = document.getElementById("hero-bg") as HTMLVideoElement | null;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {
        /* autoplay blocked — will retry on interaction */
      });
    };
    tryPlay();
    const t = window.setTimeout(tryPlay, 500);
    const onFirst = () => {
      tryPlay();
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("click", onFirst);
    };
    window.addEventListener("touchstart", onFirst, { once: true });
    window.addEventListener("click", onFirst, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("touchstart", onFirst);
      window.removeEventListener("click", onFirst);
    };
  }, []);
  const handleScroll = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  return (
  <section className="relative h-[100svh] min-h-[420px] sm:min-h-[520px] md:min-h-[620px] w-full overflow-hidden overflow-x-hidden">
  {/* hide native scrollbars for small horizontal scroll areas (mobile socials) */}
  <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;touch-action:pan-x;}`}</style>
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          id="hero-bg"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          src="/assets/sample_1.mp4"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/sample_1.mp4"
        />
        {/* Enhanced dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_20%_30%,rgba(42,227,148,0.12),transparent_60%)]" />
      </div>

  <div className="relative h-full container mx-auto px-4 flex items-center justify-center lg:justify-between gap-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none hidden lg:block absolute -top-12 -right-24 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-accent/30 to-indigo-600/20 blur-3xl opacity-60 transform rotate-12" aria-hidden />
        <div className="pointer-events-none hidden lg:block absolute -bottom-16 left-20 w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-white/8 to-accent/20 blur-2xl opacity-40" aria-hidden />

  {/* Left: Messaging */}
  <div className="max-w-2xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
            className="mt-6 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight font-extrabold text-white tracking-tight drop-shadow-2xl"
          >
            <span className="text-accent drop-shadow-lg">Elevate</span>{" "}
            Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-2 text-xs sm:text-sm md:text-2xl text-white font-medium max-w-[44ch] drop-shadow-lg"
          >
            <span className="hidden sm:inline">Design, installation, and maintenance engineered for precision, safety, and seamless passenger experience.</span>
            <span className="sm:hidden">Design, install & maintain elevators with precision and care.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="mt-5 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start items-center w-full max-w-full sm:max-w-[22rem]"
          >
            <a
              href="#request-quote"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#request-quote");
              }}
              className="btn btn-primary shadow-xl hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm w-full sm:w-auto mx-auto sm:mx-0"
            >
              <FiMessageSquare className="text-base" />
              Get a Quote
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#services");
              }}
              className="btn btn-ghost border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm w-full sm:w-auto mx-auto sm:mx-0"
            >
              <FiEye className="text-base" />
              View Services
            </a>
          </motion.div>
          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="hidden sm:block mt-4 sm:mt-6 text-sm text-white/70"
          >
            Trusted by residential, commercial, and industrial projects.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-9 h-px w-full max-w-sm bg-gradient-to-r from-white/0 via-white/60 to-white/0"
            aria-hidden
          />

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.32, duration: 0.6, ease: "easeOut" }}
            className="hidden sm:block mt-6 sm:mt-10"
          >
            <div className="flex items-start gap-4 text-sm text-white/80">
              <span className="flex-shrink-0 pt-1.5 text-xs uppercase tracking-[0.28em] text-white/60">
                Connect
              </span>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                {socials?.map((social) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <a
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/10 px-3 py-1.5 text-white transition hover:text-accent"
                    >
                      {Icon && (
                        <Icon className="text-base sm:text-lg text-accent" aria-hidden />
                      )}
                      <span>{social.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Us (hidden on desktop — desktop uses the right promo card) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.42, duration: 0.6, ease: "easeOut" }}
            className="mt-4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-2 text-white/90 lg:hidden"
          >
            <a
              href="tel:18008908411"
              className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 select-text"
            >
              <FiHeadphones
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Liftronic Care
                </p>
                <span className="block text-sm sm:text-base font-semibold text-white">
                  1800 890 8411
                </span>
              </div>
            </a>
            <a
              href="mailto:info@liftronicelevator.com"
              className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 select-text"
            >
              <FiMail
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Send us Email
                </p>
                <span className="block text-sm sm:text-base font-semibold text-white">
                  info@liftronicelevator.com
                </span>
              </div>
            </a>
            <div className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus-within:outline-none focus-within:ring-2 focus-within:ring-white/60 select-text">
              <FiPhoneCall
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Sales Enquiry
                </p>
                <a
                  href="tel:+919028226664"
                  className="block text-sm sm:text-base font-semibold text-white transition hover:text-accent"
                >
                  +91 9028226664
                </a>
              </div>
            </div>
          </motion.div>

          {/* Socials (mobile) - show below contacts on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="block sm:hidden mt-3"
          >
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.28em] text-white/60">Connect</span>
              <div className="flex items-center gap-2 whitespace-nowrap overflow-x-auto hide-scrollbar max-w-full">
                {socials?.map((social) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <a
                      key={social._id + "-mobile"}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-2 py-1 text-white transition hover:text-accent"
                    >
                      {Icon && (
                        <Icon className="text-base text-accent" aria-hidden />
                      )}
                      <span className="text-sm">{social.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
          {/* Inline centered scroll button for very small screens (below socials) */}
          <div className="flex sm:hidden w-full justify-center mt-4 mb-2">
            <button
              type="button"
              onClick={handleScroll}
              className="text-white/80 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-3 py-1 hover:text-white transition z-40 bg-black/30 backdrop-blur-sm"
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
        </div>

        {/* Right: Promo / contact card for desktop */}
        <aside className="hidden lg:flex flex-col w-full max-w-sm rounded-3xl bg-white/6 backdrop-blur-md border border-white/10 p-6 shadow-2xl text-white z-20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Request a Quote</h3>
              <p className="text-sm text-white/70">Fast response — design & installation specialists</p>
            </div>
            <div className="rounded-full bg-white/8 p-2">
              <FiHeadphones className="text-accent text-2xl" aria-hidden />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <a href="tel:18008908411" className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8">
              <div>
                <p className="text-xs text-white/70">Support</p>
                <p className="font-medium">1800 890 8411</p>
              </div>
              <FiPhoneCall className="text-accent text-xl" aria-hidden />
            </a>

            <a href="mailto:info@liftronicelevator.com" className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8">
              <div>
                <p className="text-xs text-white/70">Email</p>
                <p className="font-medium">info@liftronicelevator.com</p>
              </div>
              <FiMail className="text-accent text-xl" aria-hidden />
            </a>

            <a href="tel:+919028226664" className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8">
              <div>
                <p className="text-xs text-white/70">Sales Enquiry</p>
                <p className="font-medium">+91 9028226664</p>
              </div>
              <FiPhoneCall className="text-accent text-xl" aria-hidden />
            </a>

            <button
              onClick={() => scrollTo("#request-quote")}
              className="mt-1 btn btn-primary text-sm w-full"
            >
              <FiMessageSquare className="text-base" />
              Get a Quote
            </button>
          </div>

          <div className="mt-5 text-xs text-white/60">Serving Mumbai, Pune & major metros</div>
        </aside>

        {/* Floating scroll cue for sm+ screens */}
        <button
          type="button"
          onClick={handleScroll}
          className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-2 py-1 hover:text-white transition z-40"
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
