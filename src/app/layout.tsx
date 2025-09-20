import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Liftronic Elevator — Elevating Mechanical Excellence",
    template: "%s | Liftronic Elevator",
  },
  description:
    "Premium home and commercial elevator supply, installation, modernization, and maintenance across India.",
  keywords: [
    "home elevators",
    "residential lifts",
    "elevator installation",
    "lift modernization",
    "elevator maintenance",
    "Mumbai",
    "Pune",
    "Delhi",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "India",
  ],
  authors: [{ name: "Liftronic Elevator" }],
  creator: "Liftronic Elevator",
  publisher: "Liftronic Elevator",
  applicationName: "Liftronic Elevator",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2ae394",
      },
    ],
  },
  manifest: "/site.webmanifest",
  // themeColor moved to viewport export per Next.js metadata guidance
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Liftronic Elevator",
    title: "Liftronic Elevator — Elevating Mechanical Excellence",
    description:
      "Premium elevator solutions: design, installation, modernization, and maintenance across India.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Liftronic Elevator",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liftronic Elevator — Elevating Mechanical Excellence",
    description:
      "Premium elevator solutions: design, installation, modernization, and maintenance across India.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

// Viewport config (include themeColor here to satisfy Next.js guidance)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Accent color from src/app/globals.css : --accent -> #2ae394
  themeColor: "#2ae394",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased bg-soft text-charcoal`}
        suppressHydrationWarning={true}
      >
        {/* JSON-LD: Organization with aggregate rating */}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Liftronic Elevator",
            url: siteUrl,
            logo: `${siteUrl}/favicon.ico`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "318",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "info@example.com",
              telephone: "+91-00000-00000",
              areaServed: "IN",
              availableLanguage: ["en", "hi"],
            },
          })}
        </Script>
        {/* JSON-LD: Website + Sitelinks Searchbox */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Liftronic Elevator",
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        {/* JSON-LD: Local service with areas served + rating */}
        <Script
          id="ld-local-service"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "Liftronic Elevator",
            url: siteUrl,
            areaServed: [
              "Mumbai",
              "Pune",
              "Delhi",
              "Bengaluru",
              "Chennai",
              "Hyderabad",
              "Kolkata",
              "Ahmedabad",
              "Jaipur",
              "Chandigarh",
              "Indore",
              "Nagpur",
              "Surat",
              "Noida",
              "Gurugram",
              "Lucknow",
              "Kochi",
              "India",
            ],
            makesOffer: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Home Elevator Installation",
                areaServed: "IN",
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "318",
            },
          })}
        </Script>
        {/* JSON-LD: Breadcrumbs */}
        <Script
          id="ld-breadcrumbs"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${siteUrl}/#services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Contact",
                item: `${siteUrl}/#contact`,
              },
            ],
          })}
        </Script>
        <ViewTransition>
          <Navbar />
          {children}
          <Footer />
        </ViewTransition>
      </body>
    </html>
  );
}
