import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingExcludes: {
    "*": [
      "./public/artists/**/*",
    ],
  }
};

export default nextConfig;
