"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Set mounted state
    setIsMounted(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <section
      id="hero-section"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-gradient-to-b from-[#010101] via-[#050505] to-[#0e0e0e] text-white pt-20"
    >
      {/* === BACKGROUND VIDEO + OVERLAY === */}
      <div className="absolute inset-0 overflow-hidden">
        {!videoLoaded && (
          <Image
            src="/assets/hero-poster.jpg"
            alt="Liftronic Elevator Hero"
            fill
            priority
            className="object-cover brightness-[0.6]"
          />
        )}

        <video
          ref={videoRef}
          id="hero-bg"
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
        />

        {/* Gradient overlays + elevator glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        <div className="absolute inset-0 [background:radial-gradient(40%_60%_at_50%_30%,rgba(0,255,163,0.1),transparent_70%)]" />
        <div className="absolute inset-0 [background:radial-gradient(40%_60%_at_60%_80%,rgba(0,200,255,0.1),transparent_70%)]" />

        {/* Floating elevator light strips */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 animate-pulse" />
        <div className="absolute left-[25%] top-0 w-px h-full bg-gradient-to-b from-accent/0 via-accent/15 to-accent/0 animate-pulse" style={{ animationDelay: "0.8s" }} />
        <div className="absolute right-[25%] top-0 w-px h-full bg-gradient-to-b from-accent/0 via-accent/15 to-accent/0 animate-pulse" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative container mx-auto h-full px-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
        {/* Left content with floating parallax effect */}
        <div
          className="relative z-10 max-w-2xl text-center lg:text-left"
          style={{
            transform: isMounted && typeof window !== 'undefined' && window.innerWidth < 768 
              ? `translateY(${Math.max(-200, 300 - scrollPosition * 1)}px)`
              : `translateY(0px)`,
            transition: "transform 0.1s ease-out",
            opacity: isMounted && typeof window !== 'undefined' && window.innerWidth < 768 
              ? Math.min(1, scrollPosition / 150 + 0.6)
              : 1,
          }}
        >
          {/* Accent tag */}
          <div className="inline-block mb-5 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-lg">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              Smart Lift Technology
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent">
              Redefining Vertical Luxury
            </span>
          </h1>

          {/* Subline */}
          <div className="mt-3 flex items-center justify-center lg:justify-start gap-3 opacity-80">
            <div className="h-1 w-10 bg-accent/60 rounded-full" />
            <span className="text-xs uppercase tracking-widest text-accent">
              Building Trust with Builders, Architects, Consultants, Technology Partners, and Customers.
            </span>
            <div className="h-1 w-10 bg-accent/60 rounded-full" />
          </div>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
            &quot;Redefining Vertical Luxury&quot; reflects our commitment to transforming every ride through engineering excellence — crafted with precision, built for safety, and designed for luxury to deliver a truly seamless passenger experience.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-8 py-3 text-sm sm:text-base font-medium hover:bg-accent hover:text-black hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] transition-all duration-300"
            >
              <FiEye className="text-lg group-hover:scale-110 transition-transform" />
              <span>View Lifts</span>
            </Link>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#services");
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 text-accent px-8 py-3 text-sm sm:text-base hover:bg-accent hover:text-black font-medium hover:shadow-[0_0_25px_rgba(0,255,163,0.5)] transition-all duration-300"
            >
              <FiHeadphones className="text-lg group-hover:scale-110 transition-transform" />
              <span>Our Services</span>
            </a>
          </div>

          {/* Social Icons - Desktop only */}
          <div className="hidden sm:block mt-10">
            <span className="block text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
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
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-300"
                  >
                    {Icon && <Icon className="text-accent text-lg" />}
                    <span className="text-sm font-medium">{social.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <aside className="hidden lg:flex flex-col w-full max-w-sm rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 shadow-[0_0_40px_rgba(0,255,163,0.1)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Request a Quote</h3>
              <p className="text-sm text-white/70">
                Speak to our design & installation team
              </p>
            </div>
            <div className="rounded-full bg-accent/20 p-3">
              <FiHeadphones className="text-accent text-2xl" />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <a
              href={`tel:${contact.supportPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
            >
              <div>
                <p className="text-xs text-white/70">{contact.supportPhoneLabel}</p>
                <p className="font-medium">{contact.supportPhone}</p>
              </div>
              <FiPhoneCall className="text-accent text-xl" />
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
            >
              <div>
                <p className="text-xs text-white/70">{contact.emailLabel}</p>
                <p className="font-medium">{contact.email}</p>
              </div>
              <FiMail className="text-accent text-xl" />
            </a>

            <a
              href={`tel:${contact.salesPhone.replace(/\s/g, "")}`}
              className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-all"
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
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-black font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 transition-all duration-300 px-6 py-3 text-sm"
            >
              <FiMessageSquare className="text-base" />
              Get a Quote
            </a>
          </div>

          <div className="mt-5 text-xs text-white/60">{contact.serviceArea}</div>
        </aside>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 hover:text-white text-xs transition-all"
        >
          <span>Scroll</span>
          <svg
            className="mt-1 animate-bounce"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </section>
  );

}
