/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        // SERVER:"http://it-pc1.namagahi.co:3500",
        SERVER:"http://localhost:3500",
        TITLE:"پلتفرم اختصاصی نماآگهی"
      },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's8.uupload.ir',
          port: '',
          // pathname: '/account123/**',
        },
      ],
    },
}

module.exports = nextConfig
