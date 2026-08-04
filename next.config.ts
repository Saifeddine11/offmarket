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
      // Locale contact aliases — prevent 404 on refresh / typed English "contact" paths.
      {
        source: "/it/contact",
        destination: "/it/contatto/",
        permanent: true,
      },
      {
        source: "/it/contact/",
        destination: "/it/contatto/",
        permanent: true,
      },
      {
        source: "/es/contact",
        destination: "/es/contacto/",
        permanent: true,
      },
      {
        source: "/es/contact/",
        destination: "/es/contacto/",
        permanent: true,
      },
      {
        source: "/no/contact",
        destination: "/no/kontakt/",
        permanent: true,
      },
      {
        source: "/no/contact/",
        destination: "/no/kontakt/",
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
