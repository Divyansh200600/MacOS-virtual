import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mir-s3-cdn-cf.behance.net"],
  },
};

export default nextConfig;
