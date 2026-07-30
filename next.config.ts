import type { NextConfig } from "next";

/*
 * Every host Vercel still answers on besides the apex. The project's
 * *.vercel.app URL is not redirected by Vercel itself, and gypsyfalling.com is
 * left over from the rebrand — all three served the whole site at 200, which is
 * three copies of one page competing in search. 308s fold them into the apex
 * and carry over whatever link equity the old brand accumulated.
 */
const legacyHosts = [
  "fleetwoodmac-tompetty-band.vercel.app",
  "gypsyfalling.com",
  "www.gypsyfalling.com",
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://thechainreactionband.com/:path*",
      permanent: true,
    }));
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
