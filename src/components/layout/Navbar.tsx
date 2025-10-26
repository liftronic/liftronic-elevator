"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiXMark } from "react-icons/hi2";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import ContactModal from "~/components/ContactModal";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/products/stiltz-homelifts", label: "Stiltz", highlight: true },
  { href: "/media", label: "Success Stories" },
  { href: "/aboutus", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Check if a link is active
  const isLinkActive = (href: string) => {
    // Exact match for homepage
    if (href === "/" && pathname === "/") return true;

    // For other routes, check if pathname starts with the href
    // This handles both /products and /products/some-product
    if (href !== "/" && pathname.startsWith(href)) return true;

    return false;
  };

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        open &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const handleLinkClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    // Handle hash links specially: if we're not on the home page,
    // navigate to the home page with the hash so the target exists.
    if (href.startsWith("#")) {
      e.preventDefault();
      // close the menu first so layout stabilizes
      setOpen(false);

      if (pathname !== "/") {
        // navigate to home with hash, then scroll after navigation completes
        router.push(`/${href}`);
        // give browser a tick to render / mount elements, then smooth-scroll
        setTimeout(() => scrollTo(href), 80);
        return;
      }

      // if already on homepage, wait briefly for menu close animation to finish
      setTimeout(() => scrollTo(href), 80);
      return;
    }

    // For normal links, just close the mobile menu (no-op on desktop)
    setOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Prevent full page reload. Smooth-scroll to top on homepage,
    // otherwise navigate to homepage then scroll.
    e.preventDefault();
    // close mobile menu if open
    setOpen(false);
    if (pathname === "/") {
      // scroll to top element
      try {
        scrollTo("body");
      } catch {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // navigate to home and then scroll a tick later
    router.push("/");
    setTimeout(() => {
      try {
        scrollTo("body");
      } catch {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="fixed top-2 md:top-4 inset-x-0 z-50 px-4 md:px-5">
      <div
        ref={navRef}
        className="mx-auto container transition-all duration-300 rounded-2xl glass-solid shadow-elevate"
      >
        <div className="flex items-center justify-between h-16 md:h-18 px-4 md:px-5">
          <Link
            href="/"
            onClick={(e) =>
              handleLogoClick(e as unknown as MouseEvent<HTMLAnchorElement>)
            }
            className="flex items-center gap-3 font-bold text-lg tracking-tight"
          >
            <Image
              src="/liftronic.png"
              alt="Liftronic logo"
              width={40}
              height={40}
              priority
              className="size-9 md:size-10 transition-all"
            />
            <span className="text-base md:text-lg transition-colors text-gray-800">
              Liftronic
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
            {navLinks.map((l) => {
              const isActive = isLinkActive(l.href);
              const isFeatured = Boolean(l.highlight);

              const featuredClasses =
                "relative inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-white shadow-brand/30 transition-all hover:shadow-brand/40 hover:-translate-y-0.5";

              const standardClasses = isActive
                ? "nav-link-underline relative text-brand font-bold"
                : "nav-link-underline relative text-gray-700 hover:text-brand";

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className={isFeatured ? featuredClasses : standardClasses}
                >
                  <span>{l.label}</span>
                  {isFeatured && (
                    <span className="text-[10px] uppercase tracking-wide text-white/80">
                      Featured
                    </span>
                  )}
                  {/* Active indicator */}
                  {!isFeatured && isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="btn btn-primary"
            >
              Request a Quote
            </button>
          </div>

          <button
            aria-label={open ? "Close Menu" : "Open Menu"}
            className="md:hidden inline-flex items-center justify-center size-10 rounded-xl transition-colors text-gray-700 hover:bg-accent/10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <HiXMark className="w-6 h-6" />
            ) : (
              <RxHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-accent/20">
                <div className="flex flex-col gap-2 pt-4">
                  {navLinks.map((l) => {
                    const isActive = isLinkActive(l.href);
                    const isFeatured = Boolean(l.highlight);

                    const featuredClasses =
                      "relative flex items-center justify-between gap-2 rounded-lg bg-brand px-4 py-3 text-white shadow-brand/30";

                    const standardClasses = isActive
                      ? "py-3 px-4 rounded-lg bg-brand/10 text-brand font-bold"
                      : "py-3 px-4 rounded-lg text-gray-700 hover:bg-accent/10 hover:text-brand";

                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={(e) => handleLinkClick(e, l.href)}
                        className={`transition-colors font-semibold relative ${
                          isFeatured ? featuredClasses : standardClasses
                        }`}
                      >
                        <span>{l.label}</span>
                        {isFeatured && (
                          <span className="text-[10px] uppercase tracking-wide text-white/80">
                            Featured
                          </span>
                        )}
                        {/* Active indicator for mobile */}
                        {!isFeatured && isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-brand" />
                        )}
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setOpen(false);
                    }}
                    className="btn btn-primary w-full mt-2"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
