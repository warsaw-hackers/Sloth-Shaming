// @ts-check
// import path from "path";
const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false, child_process: false };
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@golem-sdk/golem-js": path.resolve("node_modules/@golem-sdk/golem-js/dist/golem-js.mjs"),
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
