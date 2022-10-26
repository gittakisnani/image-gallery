/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["flagsapi.com", "images.pexels.com", "images.unsplash.com", "cdn.vectorstock.com", "localhost"]
  }
}

module.exports = nextConfig
