"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiXMark, HiChevronDown } from "react-icons/hi2";
import { HiMapPin } from "react-icons/hi2";
import { useSmoothScroll } from "~/hooks/useSmoothScroll";
import { useOptionalPopupManager } from "~/contexts/PopupManagerContext";

import { FeaturedLift } from "~/sanity/utils/getFeaturedLifts";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/products/stiltz-homelifts", label: "Featured", highlight: true },
  { href: "/media", label: "Success Stories" },
  { href: "/aboutus", label: "About Us" },
];

export interface NavbarProps {
  featuredLifts?: FeaturedLift[];
}

export default function Navbar({ featuredLifts = [] }: NavbarProps = {}) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const router = useRouter();
  const popupManager = useOptionalPopupManager();
  const branches = popupManager?.branches ?? [];
  const isHomePage = pathname === "/";
  const isBranchesRoute = pathname.startsWith("/branches");

  // scrolled tracks whether the user has scrolled >300px (only meaningful on homepage)
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchesOpen, setBranchesOpen] = useState(false);
  const [stiltzOpen, setStiltzOpen] = useState(false);
  const [stiltzMobileOpen, setStiltzMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // isTransparent: ONLY true when we're on the home page and haven't scrolled yet.
  // On every other page this is always false → solid background, dark text.
  const isTransparent = isHomePage && !scrolled && !open;

  // Check if a link is active
  const isLinkActive = (href: string) => {
    // Exact match for homepage
    if (href === "/" && pathname === "/") return true;

    // For other routes, check if pathname starts with the href
    // This handles both /products and /products/some-product
    if (href !== "/" && pathname.startsWith(href)) return true;

    return false;
  };

  const isBranchLocationActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        (open || branchesOpen || stiltzOpen) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setBranchesOpen(false);
        setStiltzOpen(false);
      }
    };

    if (open || branchesOpen || stiltzOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open, branchesOpen, stiltzOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setBranchesOpen(false);
        setStiltzOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Scroll listener — resets when pathname changes so navigating back to home works correctly
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    // Sync once after mount/route change without calling setState directly in effect body.
    const frameId = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const handleLinkClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    // Handle hash links specially: if we're not on the home page,
    // navigate to the home page with the hash so the target exists.
    if (href.startsWith("#")) {
      e.preventDefault();
      // close the menu first so layout stabilizes
      setOpen(false);

      if (!isHomePage) {
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
    setBranchesOpen(false);
    setStiltzOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Prevent full page reload. Smooth-scroll to top on homepage,
    // otherwise navigate to homepage then scroll.
    e.preventDefault();
    // close mobile menu if open
    setOpen(false);
    setBranchesOpen(false);
    setStiltzOpen(false);
    if (isHomePage) {
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
        className={`mx-auto container transition-all duration-300 rounded-2xl ${
          isTransparent ? "glass-transparent" : "glass-solid shadow-elevate"
        }`}
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
              src={isTransparent ? "/liftronic-white.png" : "/liftronic.png"}
              alt="Liftronic logo"
              width={160}
              height={48}
              priority
              className="h-10 md:h-12 w-auto transition-all"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold">
            {navLinks.map((l) => {
              const isActive = isLinkActive(l.href);
              const isFeatured = Boolean(l.highlight);

              const featuredClasses = isTransparent
                ? "relative inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-white font-semibold shadow-white/30 transition-all hover:bg-white/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                : "relative inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-white font-semibold shadow-brand/30 transition-all hover:shadow-brand/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50";

              const standardClasses = isActive
                ? isTransparent
                  ? "nav-link-underline relative text-white font-bold"
                  : "nav-link-underline relative text-brand font-bold"
                : isTransparent
                  ? "nav-link-underline relative text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                  : "nav-link-underline relative text-gray-700 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm";

              if (l.label === "Featured") {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setStiltzOpen(true)}
                    onMouseLeave={() => setStiltzOpen(false)}
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className={featuredClasses}
                    >
                      <span>{l.label}</span>
                      <HiChevronDown
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                          stiltzOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                    <AnimatePresence>
                      {stiltzOpen && featuredLifts.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          id="stiltz-menu"
                          role="menu"
                          aria-label="Featured Stiltz Lifts"
                          className="absolute top-full left-0 mt-3 w-64 rounded-2xl border border-brand/20 bg-white/95 shadow-[0_22px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl overflow-hidden z-50"
                        >
                          <div className="p-2">
                            {featuredLifts.map((lift) => {
                              const href = `/products/${lift.slug}`;
                              return (
                                <Link
                                  key={lift.slug}
                                  href={href}
                                  role="menuitem"
                                  onClick={() => setStiltzOpen(false)}
                                  className={`mb-1 group block rounded-xl px-4 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 text-gray-800 hover:bg-accent/15 hover:text-brand`}
                                >
                                  <div className="flex flex-col gap-0.5">
                                    <p className="truncate text-sm font-semibold group-hover:text-brand transition-colors">
                                      {lift.title}
                                    </p>
                                    {lift.subtitle && (
                                      <p className="truncate text-[11px] text-gray-500">
                                        {lift.subtitle}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                            <div className="mx-2 mt-1 mb-1 border-t border-gray-100" />
                            <Link
                              href="/products/stiltz-homelifts"
                              role="menuitem"
                              onClick={() => setStiltzOpen(false)}
                              className="block rounded-xl px-4 py-2 hover:bg-brand/5 text-center text-xs font-semibold text-brand transition-colors"
                            >
                              View all models
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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
                  {!isFeatured && isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isTransparent ? "bg-white" : "bg-brand"
                      }`}
                    />
                  )}
                </Link>
              );
            })}

            <div
              className="relative"
              onMouseEnter={() => setBranchesOpen(true)}
              onMouseLeave={() => setBranchesOpen(false)}
            >
              <div className="inline-flex items-center gap-0">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={branchesOpen}
                  aria-controls="branches-menu"
                  onClick={() => setBranchesOpen((value) => !value)}
                  className={`nav-link-underline relative inline-flex items-center rounded-sm px-1 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 ${
                    isBranchesRoute
                      ? isTransparent
                        ? "text-white font-bold focus-visible:ring-white/80"
                        : "text-brand font-bold focus-visible:ring-brand/60"
                      : isTransparent
                        ? "text-white/90 hover:text-white focus-visible:ring-white/80"
                        : "text-gray-700 hover:text-brand focus-visible:ring-brand/60"
                  }`}
                >
                  <span>Branches</span>
                </button>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={branchesOpen}
                  aria-controls="branches-menu"
                  onClick={() => setBranchesOpen((value) => !value)}
                  className={`inline-flex items-center rounded-sm px-0.5 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 ${
                    isBranchesRoute
                      ? isTransparent
                        ? "text-white font-bold focus-visible:ring-white/80"
                        : "text-brand font-bold focus-visible:ring-brand/60"
                      : isTransparent
                        ? "text-white/90 hover:text-white focus-visible:ring-white/80"
                        : "text-gray-700 hover:text-brand focus-visible:ring-brand/60"
                  }`}
                  >
                    <HiChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        branchesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
              </div>
              <AnimatePresence>
                {branchesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    id="branches-menu"
                    role="menu"
                    aria-label="Branch locations"
                    className="absolute top-full right-0 mt-3 w-72 rounded-2xl border border-brand/20 bg-white/95 shadow-[0_22px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      {branches.map((branch) => {
                        const href = `/branches/${branch.slug}`;
                        return (
                        <Link
                          key={branch.slug}
                          href={href}
                          role="menuitem"
                          onClick={() => setBranchesOpen(false)}
                          className={`mb-1 group block rounded-xl px-4 py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                            isBranchLocationActive(href)
                              ? "bg-brand/10 text-brand"
                              : "text-gray-800 hover:bg-accent/15 hover:text-brand"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <HiMapPin className="h-4 w-4 shrink-0 opacity-80" />
                            <p className="truncate text-sm font-semibold">
                              {branch.name}
                            </p>
                          </div>
                        </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setBranchesOpen(false);
                popupManager?.triggerPopupByType("requestQuote");
              }}
              className="btn btn-primary"
            >
              Request a Quote
            </button>
          </div>

          <button
            aria-label={open ? "Close Menu" : "Open Menu"}
            className={`md:hidden inline-flex items-center justify-center size-10 rounded-xl transition-colors ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-700 hover:bg-accent/10"
            }`}
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
              <div
                className={`px-6 pb-6 border-t ${
                  isTransparent ? "border-white/20" : "border-accent/20"
                }`}
              >
                <div className="flex flex-col gap-2 pt-4">
                  {navLinks.map((l) => {
                    const isActive = isLinkActive(l.href);
                    const isFeatured = Boolean(l.highlight);

                    const featuredClasses = isTransparent
                      ? "relative flex items-center justify-between gap-2 rounded-lg bg-white/20 px-4 py-3 text-white shadow-white/25"
                      : "relative flex items-center justify-between gap-2 rounded-lg bg-brand px-4 py-3 text-white shadow-brand/30";

                    const standardClasses = isActive
                      ? isTransparent
                        ? "py-3 px-4 rounded-lg bg-white/20 text-white font-bold"
                        : "py-3 px-4 rounded-lg bg-brand/10 text-brand font-bold"
                      : isTransparent
                        ? "py-3 px-4 rounded-lg text-white/90 hover:bg-white/10 hover:text-white"
                        : "py-3 px-4 rounded-lg text-gray-700 hover:bg-accent/10 hover:text-brand";

                    if (l.label === "Featured") {
                      return (
                        <div key={l.href} className="flex flex-col gap-1">
                          <div className={`transition-colors font-semibold relative ${featuredClasses}`}>
                            <Link
                              href={l.href}
                              onClick={(e) => handleLinkClick(e, l.href)}
                              className="flex items-center gap-2 flex-grow"
                            >
                              <span>{l.label}</span>
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setStiltzMobileOpen(!stiltzMobileOpen);
                              }}
                              className="p-1 -mr-1 rounded-md hover:bg-white/20 transition-colors z-10"
                              aria-label="Toggle featured lifts"
                            >
                              <HiChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  stiltzMobileOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>
                          <AnimatePresence initial={false}>
                            {stiltzMobileOpen && featuredLifts.length > 0 && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pr-2 pt-1 pb-2 flex flex-col gap-1">
                                  {featuredLifts.map((lift) => (
                                    <Link
                                      key={lift.slug}
                                      href={`/products/${lift.slug}`}
                                      onClick={() => {
                                        setOpen(false);
                                        setStiltzMobileOpen(false);
                                      }}
                                      className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                                        isTransparent
                                          ? "text-white/80 hover:bg-white/10 hover:text-white"
                                          : "text-gray-600 hover:bg-accent/10 hover:text-brand"
                                      }`}
                                    >
                                      {lift.title}
                                    </Link>
                                  ))}
                                  <Link
                                    href="/products/stiltz-homelifts"
                                    onClick={() => {
                                      setOpen(false);
                                      setStiltzMobileOpen(false);
                                    }}
                                    className={`py-2 px-3 mt-1 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                                      isTransparent
                                        ? "text-charcoal bg-white/90 hover:bg-white"
                                        : "text-brand bg-brand/10 hover:bg-brand/20"
                                    }`}
                                  >
                                    View all models
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

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
                          <span
                            className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full ${
                              isTransparent ? "bg-white" : "bg-brand"
                            }`}
                          />
                        )}
                      </Link>
                    );
                  })}

                  {/* Mobile Branches Section */}
                  <div
                    className={`pt-2 border-t mt-2 ${
                      isTransparent ? "border-white/20" : "border-accent/20"
                    }`}
                  >
                    <p
                      className={`block py-2 px-4 text-xs uppercase tracking-wide font-semibold transition-colors ${
                        isTransparent
                          ? "text-white/70 hover:text-white"
                          : "text-gray-500 hover:text-brand"
                      }`}
                    >
                      Our Branches
                    </p>
                    {branches.map((branch) => {
                        const href = `/branches/${branch.slug}`;
                        return (
                        <Link
                          key={branch.slug}
                          href={href}
                          onClick={() => {
                            setOpen(false);
                            setBranchesOpen(false);
                          }}
                          className={`block py-3 px-4 rounded-lg transition-colors font-semibold text-sm ${
                            isTransparent
                              ? "text-white/90 hover:bg-white/10 hover:text-white"
                              : "text-gray-700 hover:bg-accent/10 hover:text-brand"
                          }`}
                        >
                          {branch.name}
                        </Link>
                        );
                      })}
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setBranchesOpen(false);
                      popupManager?.triggerPopupByType("requestQuote");
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
    </div>
  );
}
