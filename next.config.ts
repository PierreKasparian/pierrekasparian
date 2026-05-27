import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  redirects() {
    return Promise.resolve([
      {
        source: "/:lang/prestations",
        destination: "/:lang/services",
        permanent: true,
      },
      {
        source: "/:lang/prestations/:path*",
        destination: "/:lang/services/:path*",
        permanent: true,
      },
      // Blog: articles migrated from flat /blog/:slug to /blog/article/:slug
      {
        source: "/:lang/blog/integrer-llm-rgpd",
        destination: "/:lang/blog/article/integrer-llm-rgpd",
        permanent: true,
      },
      {
        source: "/:lang/blog/parser-pdf-pymupdf",
        destination: "/:lang/blog/article/parser-pdf-pymupdf",
        permanent: true,
      },
      {
        source: "/:lang/blog/integrate-llm-gdpr",
        destination: "/:lang/blog/article/integrate-llm-gdpr",
        permanent: true,
      },
      {
        source: "/:lang/blog/parse-pdf-pymupdf",
        destination: "/:lang/blog/article/parse-pdf-pymupdf",
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
