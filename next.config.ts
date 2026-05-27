import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
    ]);
  },
};

export default nextConfig;
