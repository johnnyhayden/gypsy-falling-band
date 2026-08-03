import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /*
       * The project's *.vercel.app URL is not redirected by Vercel itself, so
       * without this it serves a second copy of the site competing in search.
       */
      {
        source: "/:path*",
        has: [
          { type: "host" as const, value: "fleetwoodmac-tompetty-band.vercel.app" },
        ],
        destination: "https://fleetwoodmusiccity.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 85],
    remotePatterns: [
      // YouTube poster frame for the featured video
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
