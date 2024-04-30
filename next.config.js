/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "hosea-food-ordering.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
