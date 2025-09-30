import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable React's experimental View Transitions integration
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
