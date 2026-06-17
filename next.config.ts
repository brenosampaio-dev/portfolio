import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (the home dir has its own lockfile).
  outputFileTracingRoot: __dirname,
  // Static export (SSG) — produces plain HTML for fast first paint, SEO and
  // recruiter/ATS parsing. Deploys trivially to Vercel or any static host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
