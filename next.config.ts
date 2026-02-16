import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/igaakagency',
  assetPrefix: '/igaakagency',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
