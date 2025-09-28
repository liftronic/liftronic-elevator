"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/aboutus", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      const onScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      setScrolled(true);
    }
  }, [isHomePage]);

  const handleLinkClick = async (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    // Handle hash links specially: if we're not on the home page,
    // navigate to the home page with the hash so the target exists.
    if (href.startsWith("#")) {
      e.preventDefault();
      // close the menu first so layout stabilizes
      setOpen(false);

      if (!isHomePage) {
        // navigate to home with hash, then scroll after navigation completes
        await router.push(`/${href}`);
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

  const handleLogoClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Prevent full page reload. Smooth-scroll to top on homepage,
    // otherwise navigate to homepage then scroll.
    e.preventDefault();
    // close mobile menu if open
    setOpen(false);
    if (isHomePage) {
      // scroll to top element
      try {
        scrollTo("body");
      } catch (err) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // navigate to home and then scroll a tick later
    await router.push("/");
    setTimeout(() => {
      try {
        scrollTo("body");
      } catch (err) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="fixed top-4 inset-x-0 z-50 px-5">
      <div
        className={`mx-auto container transition-all duration-300 rounded-2xl ${
          scrolled || open ? "glass-solid shadow-elevate" : "glass-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5">
          <Link
            href="/"
            onClick={(e) => handleLogoClick(e as unknown as MouseEvent<HTMLAnchorElement>)}
            className="flex items-center gap-3 font-bold text-lg tracking-tight"
          >
            <Image
              src={scrolled ? "/liftronic.png" : "/liftronic-white.png"}
              alt="Liftronic logo"
              width={40}
              height={40}
              priority
              className="size-10 transition-all"
            />
            <span
              className={`transition-colors ${
                scrolled || open ? "text-gray-800" : "text-white drop-shadow-lg"
              }`}
            >
              Liftronic
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href)}
                className={`nav-link-underline ${
                  scrolled
                    ? "text-gray-700 hover:text-brand"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#request-quote"
              onClick={(e) => handleLinkClick(e, "#request-quote")}
              className="btn btn-primary"
            >
              Request a Quote
            </Link>
          </div>

          <button
            aria-label="Open Menu"
            className={`md:hidden inline-flex items-center justify-center size-10 rounded-xl transition-colors ${
              scrolled
                ? "text-gray-700 hover:bg-accent/10"
                : "text-white hover:bg-white/10"
            } ${open ? "menu-icon-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="relative w-5 h-4 menu-icon-animate">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-current" />
              <span className="absolute inset-x-0 top-1.5 h-0.5 bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current" />
            </div>
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
              <div
                className={`px-6 pb-6 border-t ${
                  scrolled ? "border-accent/20" : "border-white/20"
                }`}
              >
                <div className="flex flex-col gap-2 pt-4">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className={`py-3 px-4 rounded-lg transition-colors font-medium ${
                        scrolled
                          ? "text-gray-700 hover:bg-accent/10 hover:text-brand"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                  <button
                    onClick={(e) => handleLinkClick(e, "#request-quote")}
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
    </div>
  );
}
