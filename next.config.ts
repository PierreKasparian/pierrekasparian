import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
