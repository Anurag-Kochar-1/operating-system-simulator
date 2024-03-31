/** @type {import('next').NextConfig} */

import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media1.tenor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// module.exports = nextConfig;

export default withPlaiceholder(nextConfig);
