/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  env: {
    // SERVER: process.env.SERVER || "http://portal.namaagahi.com:3500",
    SERVER: "http://localhost:3500",
    TITLE: "پلتفرم اختصاصی نماآگهی",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s8.uupload.ir",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
});
module.exports = nextConfig;
