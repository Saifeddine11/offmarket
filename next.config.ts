import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
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
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/about",
        destination: "/about/",
        permanent: true,
      },
      {
        source: "/fr/about/",
        destination: "/about/",
        permanent: true,
      },
      {
        source: "/fr/sur-plan",
        destination: "/sur-plan/",
        permanent: true,
      },
      {
        source: "/fr/sur-plan/",
        destination: "/sur-plan/",
        permanent: true,
      },
      {
        source: "/fr/contact",
        destination: "/contact/",
        permanent: true,
      },
      {
        source: "/fr/contact/",
        destination: "/contact/",
        permanent: true,
      },
      {
        source: "/location",
        destination: "/quartiers/",
        permanent: true,
      },
      {
        source: "/location/",
        destination: "/quartiers/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Versioned legacy assets (?v=...) are safe to cache immutably.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
