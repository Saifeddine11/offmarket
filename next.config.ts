import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/infrastructure",
        destination: "/sur-plan/",
        permanent: true,
      },
      {
        source: "/infrastructure/",
        destination: "/sur-plan/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
