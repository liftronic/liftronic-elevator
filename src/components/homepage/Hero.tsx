"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSmoothScroll } from "~/hooks/useSmoothScroll";
import {
  FiHeadphones,
  FiMail,
  FiPhoneCall,
  FiMessageSquare,
  FiEye,
} from "react-icons/fi";
import { Social, ContactInfo } from "~/../typings";
import { getIcon } from "~/sanity/utils/iconMapper";

interface HeroProps {
  socials: Social[];
  contactInfo: ContactInfo | null;
}

export default function Hero({ socials, contactInfo }: HeroProps) {
  const { scrollTo } = useSmoothScroll();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fallback data in case Sanity data is not available
  const fallbackContactInfo = {
    supportPhone: "1800 890 8411",
    supportPhoneLabel: "Liftronic Care",
    email: "info@liftronicelevator.com",
    emailLabel: "Send us Email",
    salesPhone: "+91 9028226664",
    salesPhoneLabel: "Sales Enquiry",
    serviceArea: "Serving Mumbai, Pune & major metros",
  };

  const contact = contactInfo || fallbackContactInfo;

  useEffect(() => {
    // Lazy load video after initial paint
    const loadVideo = () => {
      if (videoRef.current && !videoLoaded) {
        const video = videoRef.current;
        video.src = "/assets/sample_1.mp4";
        video.load();

        const tryPlay = () => {
          video.play().catch(() => {
            /* autoplay blocked — will retry on interaction */
          });
        };

        video.addEventListener(
          "loadeddata",
          () => {
            setVideoLoaded(true);
            tryPlay();
          },
          { once: true }
        );
      }
    };

    // Use Intersection Observer to load video when hero is visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay video load slightly to prioritize FCP
            setTimeout(loadVideo, 100);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = document.querySelector("#hero-section");
    if (heroElement) {
      observerRef.current.observe(heroElement);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [videoLoaded]);
  const handleScroll = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  return (
    <section
      id="hero-section"
      className="relative h-[100svh] min-h-[420px] sm:min-h-[520px] md:min-h-[620px] w-full overflow-hidden overflow-x-hidden"
    >
      {/* hide native scrollbars for small horizontal scroll areas (mobile socials) */}
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;touch-action:pan-x;}`}</style>
      {/* Background video with poster image */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static poster image for FCP - loads immediately */}
        {!videoLoaded && (
          <Image
            src="/assets/hero-poster.jpg"
            alt="Liftronic Elevator Hero"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Video - lazy loaded after FCP */}
        <video
          ref={videoRef}
          id="hero-bg"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
        />

        {/* Enhanced dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_20%_30%,rgba(42,227,148,0.12),transparent_60%)]" />
      </div>

      <div className="relative h-full container mx-auto px-6 md:px-4 flex items-center justify-center lg:justify-between gap-8">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none hidden lg:block absolute -top-12 -right-24 w-[380px] h-[380px] rounded-full bg-gradient-to-br from-accent/30 to-indigo-600/20 blur-3xl opacity-60 transform rotate-12"
          aria-hidden
        />
        <div
          className="pointer-events-none hidden lg:block absolute -bottom-16 left-20 w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-white/8 to-accent/20 blur-2xl opacity-40"
          aria-hidden
        />

        {/* Left: Messaging */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="mt-6 sm:mt-4 lg:mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-extrabold text-white tracking-tight drop-shadow-2xl animate-fade-in">
            <span className="text-accent drop-shadow-lg">
              Redefining Vertical{" "}
            </span>{" "}
            Luxury
          </h1>

          <p className="mt-2 text-base sm:text-lg lg:text-2xl text-white font-medium max-w-[44ch] drop-shadow-lg animate-fade-in-delay-1">
            <span className="hidden sm:inline">
              “Redefining Vertical Luxury” reflects our commitment to
              transforming every ride through engineering excellence — crafted
              with precision, built for safety, and designed for luxury to
              deliver a truly seamless passenger experience.
            </span>
            <span className="sm:hidden">
              “Redefining Vertical Luxury” reflects our commitment to
              transforming every ride through engineering excellence — crafted
              with precision, built for safety, and designed for luxury to
              deliver a truly seamless passenger experience.
            </span>
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start items-center w-full max-w-full sm:max-w-[22rem] animate-fade-in-delay-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="btn btn-primary shadow-xl hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base px-6 py-3 w-full sm:w-auto mx-auto sm:mx-0"
            >
              <FiMessageSquare className="text-lg" />
              Get a Quote
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#services");
              }}
              className="btn btn-ghost border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base px-6 py-3 w-full sm:w-auto mx-auto sm:mx-0"
            >
              <FiEye className="text-lg" />
              View Services
            </a>
          </div>
          {/* Trust line */}
          <div className="hidden sm:block mt-4 sm:mt-6 text-sm text-white/70 animate-fade-in-delay-3">
            Building Trust with Builders, Architects, Consultants, Technology
            Partners, and Customers.
          </div>

          <div
            className="mt-9 h-px w-full max-w-sm bg-gradient-to-r from-white/0 via-white/60 to-white/0 animate-fade-in-delay-3"
            aria-hidden
          />

          {/* Socials - deferred rendering */}
          <div className="hidden sm:block mt-6 sm:mt-10 animate-fade-in-delay-4">
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
                        <Icon
                          className="text-base sm:text-lg text-accent"
                          aria-hidden
                        />
                      )}
                      <span>{social.title}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Us (hidden on desktop — desktop uses the right promo card) */}
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-2 text-white/90 lg:hidden animate-fade-in-delay-4">
            <a
              href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
              className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 select-text"
            >
              <FiHeadphones
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60 text-left">
                  {contact.supportPhoneLabel}
                </p>
                <span className="block text-sm sm:text-base font-semibold text-white">
                  {contact.supportPhone}
                </span>
              </div>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 select-text"
            >
              <FiMail
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60 text-left">
                  {contact.emailLabel}
                </p>
                <span className="block text-sm sm:text-base font-semibold text-white">
                  {contact.email}
                </span>
              </div>
            </a>
            <div className="flex w-full sm:w-auto items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 p-2 sm:p-3 transition hover:bg-white/10 hover:shadow-lg hover:shadow-accent/20 focus-within:outline-none focus-within:ring-2 focus-within:ring-white/60 select-text">
              <FiPhoneCall
                className="mt-0.5 shrink-0 text-2xl text-accent"
                aria-hidden
              />
              <div className="space-y-1 leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/60 text-left">
                  {contact.salesPhoneLabel}
                </p>
                <a
                  href={`tel:${contact.salesPhone.replace(/\s/g, "")}`}
                  className="block text-sm sm:text-base font-semibold text-white transition hover:text-accent"
                >
                  {contact.salesPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Socials (mobile) - show below contacts on small screens */}
          <div className="block sm:hidden mt-3 animate-fade-in-delay-5">
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.28em] text-white/60">
                Connect
              </span>
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
          </div>
        </div>

        {/* Right: Promo / contact card for desktop */}
        <aside className="hidden lg:flex flex-col w-full max-w-sm rounded-3xl bg-white/6 backdrop-blur-md border border-white/10 p-6 shadow-2xl text-white z-20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Request a Quote</h3>
              <p className="text-sm text-white/70">
                Fast response — design & installation specialists
              </p>
            </div>
            <div className="rounded-full bg-white/8 p-2">
              <FiHeadphones className="text-accent text-2xl" aria-hidden />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <a
              href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-white/70">
                  {contact.supportPhoneLabel}
                </p>
                <p className="font-medium">{contact.supportPhone}</p>
              </div>
              <FiPhoneCall className="text-accent text-xl" aria-hidden />
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-white/70">{contact.emailLabel}</p>
                <p className="font-medium">{contact.email}</p>
              </div>
              <FiMail className="text-accent text-xl" aria-hidden />
            </a>

            <a
              href={`tel:${contact.salesPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-lg border border-white/8 hover:bg-white/8"
            >
              <div>
                <p className="text-xs text-white/70">
                  {contact.salesPhoneLabel}
                </p>
                <p className="font-medium">{contact.salesPhone}</p>
              </div>
              <FiPhoneCall className="text-accent text-xl" aria-hidden />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="mt-1 btn btn-primary text-sm w-full"
            >
              <FiMessageSquare className="text-base" />
              Get a Quote
            </a>
          </div>

          <div className="mt-5 text-xs text-white/60">
            {contact.serviceArea}
          </div>
        </aside>

        {/* Floating scroll cue - positioned at bottom for both mobile and desktop */}
        <button
          type="button"
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-3 sm:px-2 py-1 hover:text-white transition z-40 bg-black/30 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none"
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
