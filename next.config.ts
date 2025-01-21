import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "framerusercontent.com",
      "huhu-web-statics.s3.us-west-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
