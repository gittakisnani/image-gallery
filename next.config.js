/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["flagsapi.com", "images.pexels.com"]
  }
}

module.exports = nextConfig