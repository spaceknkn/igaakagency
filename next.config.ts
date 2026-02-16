import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/igaakagency',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
