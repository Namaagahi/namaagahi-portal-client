/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER:"http://localhost:3500",
        TITLE:"پورتال دیتابیس نماآگهی"
      },
}

module.exports = nextConfig
