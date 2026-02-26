import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['sharp'],
  outputFileTracingExcludes: {
    "*": [
      "**/.git/**/*",
      "**/node_modules/**/*",
      "**/public/**/*"
    ],
    "api/**/*": [
      "**/.git/**/*",
      "**/node_modules/**/*",
      "**/public/**/*"
    ],
  }
};

export default nextConfig;
