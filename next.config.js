/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        // SERVER:'http://portal.namaagahi.com:3500',
        SERVER:"http://localhost:3500",
        TITLE:"پلتفرم اختصاصی نماآگهی",
      },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's8.uupload.ir',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
        },
      ],
    },
}
module.exports = nextConfig
