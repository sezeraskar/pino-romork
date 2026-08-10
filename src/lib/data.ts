import { cache } from "react";
import { prisma } from "./prisma";
import { modelSlug } from "./content";
import type {
  BlogBlock,
  BlogPost,
  Category,
  Model,
  ProductItem,
} from "./content";

export type Site = {
  name: string;
  tagline: string;
  founded: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  address: string;
  whatsappPhone: string;
  whatsapp: string;
  hero: string;
  craftImage: string;
};

export function waFor(phone: string, subject: string): string {
  return (
    `https://api.whatsapp.com/send?phone=${phone}&text=` +
    encodeURIComponent(`Merhaba, ${subject} hakkında teklif almak istiyorum.`)
  );
}

export const getSite = cache(async (): Promise<Site> => {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const phone = s?.whatsappPhone || "905412577792";
  return {
    name: s?.name ?? "Pino Römork",
    tagline: s?.tagline ?? "Mobil Ekonomik Çözümler",
    founded: s?.founded ?? "2009",
    phonePrimary: s?.phonePrimary ?? "+90 216 606 20 03",
    phoneSecondary: s?.phoneSecondary ?? "+90 541 257 77 92",
    email: s?.email ?? "info@pinoromork.com",
    address: s?.address ?? "",
    whatsappPhone: phone,
    whatsapp:
      `https://api.whatsapp.com/send?phone=${phone}&text=` +
      encodeURIComponent("Merhaba, römork hakkında bilgi almak istiyorum."),
    hero: s?.heroImage ?? "/images/hero.jpg",
    craftImage: s?.craftImage ?? "/images/uretim.jpg",
  };
});

export const getHomeAbout = cache(async (): Promise<string[]> => {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  return (s?.homeAbout as string[]) ?? [];
});

export const getNav = cache(async () => {
  const rows = await prisma.navItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((n) => ({ label: n.label, href: n.href }));
});

export const getTrustStats = cache(async () => {
  const rows = await prisma.trustStat.findMany({ orderBy: { order: "asc" } });
  return rows.map((t) => ({ value: t.value, label: t.label }));
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const rows = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { models: { orderBy: { order: "asc" } } },
  });
  return rows.map((c) => ({
    slug: c.slug,
    title: c.title,
    fullTitle: c.fullTitle,
    count: c.count,
    image: c.image,
    alt: c.alt,
    tagline: c.tagline,
    intro: c.intro,
    useCases: c.useCases as string[],
    features: c.features as { title: string; text: string }[],
    sampleSpecs: c.sampleSpecs as [string, string][],
    models: c.models.map((m) => ({ name: m.name, desc: m.desc })) as Model[],
  }));
});

export async function getCategory(slug: string): Promise<Category | undefined> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug);
}

export async function getProducts() {
  const cats = await getCategories();
  return cats.map((c) => ({
    title: c.title,
    count: c.count,
    image: c.image,
    alt: c.alt,
    href: `/${c.slug}`,
  }));
}

export async function getProductItems(): Promise<ProductItem[]> {
  const cats = await getCategories();
  return cats.flatMap((c) =>
    c.models.map((m, i) => ({
      slug: modelSlug(m.name),
      name: m.name,
      desc: m.desc,
      categorySlug: c.slug,
      categoryTitle: c.title,
      categoryFullTitle: c.fullTitle,
      image: c.image,
      index: i,
    })),
  );
}

export async function getModel(
  catSlug: string,
  mSlug: string,
): Promise<{ category: Category; model: Model; index: number } | undefined> {
  const category = await getCategory(catSlug);
  if (!category) return undefined;
  const index = category.models.findIndex((m) => modelSlug(m.name) === mSlug);
  if (index === -1) return undefined;
  return { category, model: category.models[index], index };
}

export async function getFeaturedModels() {
  const [cats, picks] = await Promise.all([
    getCategories(),
    prisma.featuredPick.findMany({ orderBy: { order: "asc" } }),
  ]);
  const pickMap = new Map(picks.map((p) => [p.categorySlug, p.modelName]));
  return cats.map((c) => {
    const pickName = pickMap.get(c.slug);
    const m = c.models.find((x) => x.name === pickName) ?? c.models[0];
    return {
      categoryTitle: c.title,
      name: m.name,
      desc: m.desc,
      image: c.image,
      alt: c.alt,
      href: `/${c.slug}/${modelSlug(m.name)}`,
      specs: c.sampleSpecs.slice(0, 2) as [string, string][],
    };
  });
}

export const getCraftPoints = cache(async () => {
  const rows = await prisma.craftPoint.findMany({ orderBy: { order: "asc" } });
  return rows.map((p) => ({ n: p.n, title: p.title, text: p.text }));
});

export const getServices = cache(async () => {
  const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return rows.map((s) => ({
    n: s.n,
    title: s.title,
    desc: s.desc,
    href: s.href,
    external: s.external,
    image: s.image,
  }));
});

export const getCertificates = cache(async () => {
  const rows = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return rows.map((c) => ({ name: c.name, org: c.org, desc: c.desc }));
});

export const getAbout = cache(async () => {
  const c = await prisma.contentPage.findUnique({ where: { key: "about" } });
  return {
    intro: c?.intro ?? "",
    paragraphs: (c?.paragraphs as string[]) ?? [],
    values: (c?.values as { title: string; text: string }[]) ?? [],
    stats: (c?.stats as { value: string; label: string }[]) ?? [],
  };
});

export const getCekiDemiri = cache(async () => {
  const c = await prisma.contentPage.findUnique({ where: { key: "ceki-demiri" } });
  return {
    intro: c?.intro ?? "",
    points: (c?.points as { title: string; text: string }[]) ?? [],
    steps: (c?.steps as { n: string; title: string; text: string }[]) ?? [],
  };
});

export const getProjeGelistirme = cache(async () => {
  const c = await prisma.contentPage.findUnique({ where: { key: "proje-gelistirme" } });
  return {
    intro: c?.intro ?? "",
    steps: (c?.steps as { n: string; title: string; text: string }[]) ?? [],
  };
});

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const rows = await prisma.blogPost.findMany({ orderBy: { order: "asc" } });
  return rows.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    dateLabel: p.dateLabel,
    readingTime: p.readingTime,
    category: p.category,
    image: p.image,
    body: p.body as BlogBlock[],
  }));
});

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug);
}
