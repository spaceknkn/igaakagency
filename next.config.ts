import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['sharp'],
  outputFileTracingExcludes: {
    "api/**/*": [
      "public/**/*",
      "public/artists/**/*",
      "./public/**/*",
      "node_modules/**/*"
    ],
  }
};

export default nextConfig;
