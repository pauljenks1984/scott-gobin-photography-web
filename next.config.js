/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "**images.unsplash.com"
      }
    ]
  }
};

module.exports = nextConfig;
