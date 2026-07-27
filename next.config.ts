import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
