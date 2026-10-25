const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin({
  // Turbopack support is experimental and off by default.
  // "auto" enables it only on Next >= 16; the webpack config is still
  // emitted alongside, so `next build --webpack` keeps working.
  unstable_turbopack: {
    mode: "auto"
  }
});

const { compose } = require("ramda");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = compose(withBundleAnalyzer, withVanillaExtract)(nextConfig);
