import type { NextConfig } from "next";

// GitHub Pages proje deposu alt yolu (CI'da PAGES_BASE_PATH ile verilir; yerelde boş)
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // next/image (unoptimized) public görsel src'sine basePath eklemediği için
  // asset() yardımcısıyla elle prefixliyoruz — bu değeri client'a da açıyoruz.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
