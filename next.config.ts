import type { NextConfig } from "next";

// Kendi sunucumuzda (Node) çalışır: SSR + API route'ları + görsel optimizasyonu aktif.
// PM2 ile `next start` çalıştırılabilir; standalone çıktı deploy'u hafifletir.
const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
