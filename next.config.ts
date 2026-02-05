import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false /*on-off dev tools Next*/,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
