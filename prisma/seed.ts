import { PrismaClient } from "@prisma/client";
import {
  site,
  nav,
  trustStats,
  categories,
  homeAbout,
  craftPoints,
  services,
  certificates,
  about,
  cekiDemiri,
  projeGelistirme,
  blogPosts,
  FEATURED_PICKS,
  modelSlug,
} from "../src/lib/content";

const prisma = new PrismaClient();

const SUPERADMIN_PHONE = "905412577792";

async function main() {
  // Admin kullanıcı her zaman garanti edilsin
  await prisma.adminUser.upsert({
    where: { phone: SUPERADMIN_PHONE },
    update: {},
    create: { phone: SUPERADMIN_PHONE, name: "Yönetici", role: "superadmin" },
  });

  const existing = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  if (existing) {
    console.log("İçerik zaten mevcut — içerik seed'i atlandı (mevcut düzenlemeler korunur).");
    return;
  }

  await prisma.siteSetting.create({
    data: {
      id: 1,
      name: site.name,
      tagline: site.tagline,
      founded: site.founded,
      phonePrimary: site.phonePrimary,
      phoneSecondary: site.phoneSecondary,
      email: site.email,
      address: site.address,
      whatsappPhone: SUPERADMIN_PHONE,
      heroImage: site.hero,
      craftImage: site.craftImage,
      homeAbout: homeAbout,
    },
  });

  await prisma.trustStat.createMany({
    data: trustStats.map((s, i) => ({ value: s.value, label: s.label, order: i })),
  });

  await prisma.navItem.createMany({
    data: nav.map((n, i) => ({ label: n.label, href: n.href, order: i })),
  });

  for (let ci = 0; ci < categories.length; ci++) {
    const c = categories[ci];
    await prisma.category.create({
      data: {
        slug: c.slug,
        title: c.title,
        fullTitle: c.fullTitle,
        count: c.count,
        image: c.image,
        alt: c.alt,
        tagline: c.tagline,
        intro: c.intro,
        useCases: c.useCases,
        features: c.features,
        sampleSpecs: c.sampleSpecs,
        order: ci,
        models: {
          create: c.models.map((m, mi) => ({
            name: m.name,
            slug: modelSlug(m.name),
            desc: m.desc,
            order: mi,
          })),
        },
      },
    });
  }

  await prisma.featuredPick.createMany({
    data: Object.entries(FEATURED_PICKS).map(([categorySlug, modelName], i) => ({
      categorySlug,
      modelName,
      order: i,
    })),
  });

  await prisma.craftPoint.createMany({
    data: craftPoints.map((p, i) => ({ n: p.n, title: p.title, text: p.text, order: i })),
  });

  await prisma.service.createMany({
    data: services.map((s, i) => ({
      n: s.n,
      title: s.title,
      desc: s.desc,
      href: s.href,
      external: s.external,
      image: s.image,
      order: i,
    })),
  });

  await prisma.certificate.createMany({
    data: certificates.map((c, i) => ({ name: c.name, org: c.org, desc: c.desc, order: i })),
  });

  await prisma.contentPage.create({
    data: {
      key: "about",
      intro: about.intro,
      paragraphs: about.paragraphs,
      points: [],
      steps: [],
      values: about.values,
      stats: about.stats,
    },
  });

  await prisma.contentPage.create({
    data: {
      key: "ceki-demiri",
      intro: cekiDemiri.intro,
      paragraphs: [],
      points: cekiDemiri.points,
      steps: cekiDemiri.steps,
      values: [],
      stats: [],
    },
  });

  await prisma.contentPage.create({
    data: {
      key: "proje-gelistirme",
      intro: projeGelistirme.intro,
      paragraphs: [],
      points: [],
      steps: projeGelistirme.steps,
      values: [],
      stats: [],
    },
  });

  await prisma.blogPost.createMany({
    data: blogPosts.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      dateLabel: p.dateLabel,
      readingTime: p.readingTime,
      category: p.category,
      image: p.image,
      body: p.body,
      order: i,
    })),
  });

  console.log("Seed tamam: içerik DB'ye aktarıldı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
