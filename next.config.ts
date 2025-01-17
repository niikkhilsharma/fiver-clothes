import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "framerusercontent.com",
      "huhu-web-statics.s3.us-west-2.amazonaws.com",
    ],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "es",
  },
};

export default nextConfig;
