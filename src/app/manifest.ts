import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pino Römork",
    short_name: "Pino Römork",
    description:
      "2009'dan bu yana yerli üretim römork ve karavan imalatı. Hafif yük, araç taşıma, ağır yük, tekne ve canlı hayvan römorkları.",
    start_url: "/",
    display: "standalone",
    background_color: "#101110",
    theme_color: "#101110",
    lang: "tr",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
