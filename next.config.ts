import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
  // Local credentials and mutable records are runtime-owned, never build assets.
  // This only limits packaging; it does not change their on-disk read/write paths.
  outputFileTracingExcludes: {
    "/*": [
      "model-keys.local.json",
      ".env*",
      "deploy/*.env",
      "artifacts/**/*",
      ".local-records/**/*",
    ],
  },
};

export default config;
