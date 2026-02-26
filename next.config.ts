import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingExcludes: {
    "*": [
      "public/**/*",
      "public/artists/**/*",
      "./public/**/*"
    ],
  }
};

export default nextConfig;
