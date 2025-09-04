import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable React's experimental View Transitions integration
    viewTransition: true,
  },
};

export default nextConfig;
