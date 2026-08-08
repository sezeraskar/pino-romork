import type { MetadataRoute } from "next";
import { blogPosts, categories, modelSlug } from "@/lib/content";

const SITE_URL = "https://pinoromork.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "",
    "/urunler",
    "/kurumsal",
    "/hakkimizda",
    "/belgelerimiz",
    "/hizmetler",
    "/ceki-demiri",
    "/proje-gelistirme",
    "/blog",
    "/iletisim",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const modelPages = categories.flatMap((c) =>
    c.models.map((m) => ({
      url: `${SITE_URL}/${c.slug}/${modelSlug(m.name)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const blogPages = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...modelPages, ...blogPages];
}
