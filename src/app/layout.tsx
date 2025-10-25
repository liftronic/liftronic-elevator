import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints for Sanity CDN */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        {/* Musk Font from CDN Fonts */}
        <link href="https://fonts.cdnfonts.com/css/musk" rel="stylesheet" />
      </head>
      <body
        className={`${dmSans.variable} antialiased bg-soft text-charcoal`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
