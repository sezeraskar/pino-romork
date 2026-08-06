import type { NextConfig } from "next";

// GitHub Pages proje deposu alt yolu (CI'da PAGES_BASE_PATH ile verilir; yerelde boş)
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
