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
    className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-gradient-to-b from-black via-[#0A0A0A] to-[#101010] pt-20"
  >
    {/* Hide scrollbars for socials */}
    <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>

    {/* === BACKGROUND === */}
    <div className="absolute inset-0 overflow-hidden">
      {!videoLoaded && (
        <Image
          src="/assets/hero-poster.jpg"
          alt="Liftronic Elevator Hero"
          fill
          priority
          quality={90}
          className="object-cover brightness-[0.7]"
        />
      )}
      <video
        ref={videoRef}
        id="hero-bg"
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        loop
        muted
        playsInline
      />
      {/* Deep overlay + glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      <div className="absolute inset-0 [background:radial-gradient(50%_70%_at_30%_20%,rgba(0,255,163,0.15),transparent_70%)]" />
      <div className="absolute inset-0 [background:radial-gradient(60%_80%_at_70%_80%,rgba(0,180,255,0.1),transparent_70%)]" />
    </div>

    {/* === CONTENT === */}
    <div className="relative container mx-auto h-full px-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
      {/* Glow decoration */}
      <div className="pointer-events-none absolute -top-32 left-10 w-[400px] h-[400px] rounded-full bg-accent/20 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* === LEFT TEXT === */}
      <div className="relative z-10 max-w-2xl text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_2px_20px_rgba(0,255,163,0.3)] animate-fade-in">
          <span className="bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
            Redefining Vertical Luxury
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed animate-fade-in-delay-1 max-w-xl mx-auto lg:mx-0">
          Reflects our commitment to transforming every ride through engineering excellence — crafted with precision, built for safety, and designed for luxury to deliver a truly seamless passenger experience.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-delay-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 transition-all duration-300 px-8 py-3 text-sm sm:text-base"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 hover:text-accent transition-all duration-300 px-8 py-3 text-sm sm:text-base backdrop-blur-md"
          >
            <FiEye className="text-lg" />
            View Services
          </a>
        </div>

        <p className="hidden sm:block mt-8 text-sm text-white/60 animate-fade-in-delay-3">
          Trusted by Builders, Architects, and Consultants across India.
        </p>

        {/* Socials */}
        <div className="mt-10 animate-fade-in-delay-4">
          <span className="block text-xs uppercase tracking-[0.35em] text-white/50 mb-3">
            Connect
          </span>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {socials?.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 hover:bg-white/20 hover:text-accent transition-all duration-300"
                >
                  {Icon && <Icon className="text-accent text-lg" />}
                  <span className="text-sm text-white font-medium">{social.title}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact (mobile only) */}
        <div className="mt-8 flex flex-col sm:hidden gap-3 text-white/90">
          <a
            href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
          >
            <FiHeadphones className="text-2xl text-accent" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase text-white/60">{contact.supportPhoneLabel}</p>
              <p className="text-sm font-semibold">{contact.supportPhone}</p>
            </div>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-all"
          >
            <FiMail className="text-2xl text-accent" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase text-white/60">{contact.emailLabel}</p>
              <p className="text-sm font-semibold">{contact.email}</p>
            </div>
          </a>
        </div>
      </div>

      {/* === RIGHT CARD (desktop only) === */}
      <aside className="hidden lg:flex flex-col w-full max-w-sm rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 shadow-[0_0_60px_rgba(0,255,163,0.15)] text-white animate-fade-in-delay-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Request a Quote</h3>
            <p className="text-sm text-white/70">Quick response — design & installation experts</p>
          </div>
          <div className="rounded-full bg-accent/20 p-3">
            <FiHeadphones className="text-accent text-2xl" />
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <a
            href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
            className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
          >
            <div>
              <p className="text-xs text-white/70">{contact.supportPhoneLabel}</p>
              <p className="font-medium">{contact.supportPhone}</p>
            </div>
            <FiPhoneCall className="text-accent text-xl" />
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
          >
            <div>
              <p className="text-xs text-white/70">{contact.emailLabel}</p>
              <p className="font-medium">{contact.email}</p>
            </div>
            <FiMail className="text-accent text-xl" />
          </a>

          <a
            href={`tel:${contact.salesPhone.replace(/\s/g, "")}`}
            className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
          >
            <div>
              <p className="text-xs text-white/70">{contact.salesPhoneLabel}</p>
              <p className="font-medium">{contact.salesPhone}</p>
            </div>
            <FiPhoneCall className="text-accent text-xl" />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 transition-all duration-300 px-6 py-3 text-sm"
          >
            <FiMessageSquare className="text-base" />
            Get a Quote
          </a>
        </div>

        <div className="mt-5 text-xs text-white/60">{contact.serviceArea}</div>
      </aside>

      {/* === SCROLL INDICATOR === */}
      <button
        type="button"
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white text-xs px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
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