/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@langchain/community",
      "pdf-parse",
    ],
  },
};

module.exports = nextConfig;
