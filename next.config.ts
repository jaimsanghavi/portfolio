import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize untitledui icons
  experimental: {
    optimizePackageImports: ["@untitledui/icons"],
  },
  // Disable TypeScript errors during builds for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
