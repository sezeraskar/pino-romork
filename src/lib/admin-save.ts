import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { modelSlug } from "./content";

type Any = Record<string, unknown>;
const arr = (v: unknown): Any[] => (Array.isArray(v) ? (v as Any[]) : []);
const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
// JSON kolonları için güvenli cast
const J = (v: unknown): Prisma.InputJsonValue => v as Prisma.InputJsonValue;

export async function saveSection(section: string, data: unknown): Promise<void> {
  switch (section) {
    case "settings": {
      const d = data as Any;
      await prisma.siteSetting.upsert({
        where: { id: 1 },
        update: {
          name: str(d.name),
          tagline: str(d.tagline),
          founded: str(d.founded),
          phonePrimary: str(d.phonePrimary),
          phoneSecondary: str(d.phoneSecondary),
          email: str(d.email),
          address: str(d.address),
          whatsappPhone: str(d.whatsappPhone).replace(/\D/g, ""),
          heroImage: str(d.heroImage),
          craftImage: str(d.craftImage),
          homeAbout: J(arr(d.homeAbout).map(String)),
        },
        create: {
          id: 1,
          name: str(d.name),
          tagline: str(d.tagline),
          founded: str(d.founded),
          phonePrimary: str(d.phonePrimary),
          phoneSecondary: str(d.phoneSecondary),
          email: str(d.email),
          address: str(d.address),
          whatsappPhone: str(d.whatsappPhone).replace(/\D/g, ""),
          heroImage: str(d.heroImage),
          craftImage: str(d.craftImage),
          homeAbout: J(arr(d.homeAbout).map(String)),
        },
      });
      return;
    }

    case "trust": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.trustStat.deleteMany(),
        prisma.trustStat.createMany({
          data: rows.map((r, i) => ({ value: str(r.value), label: str(r.label), order: i })),
        }),
      ]);
      return;
    }

    case "nav": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.navItem.deleteMany(),
        prisma.navItem.createMany({
          data: rows.map((r, i) => ({ label: str(r.label), href: str(r.href), order: i })),
        }),
      ]);
      return;
    }

    case "craft": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.craftPoint.deleteMany(),
        prisma.craftPoint.createMany({
          data: rows.map((r, i) => ({ n: str(r.n), title: str(r.title), text: str(r.text), order: i })),
        }),
      ]);
      return;
    }

    case "services": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.service.deleteMany(),
        prisma.service.createMany({
          data: rows.map((r, i) => ({
            n: str(r.n),
            title: str(r.title),
            desc: str(r.desc),
            href: str(r.href),
            external: !!r.external,
            image: str(r.image),
            order: i,
          })),
        }),
      ]);
      return;
    }

    case "certificates": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.certificate.deleteMany(),
        prisma.certificate.createMany({
          data: rows.map((r, i) => ({ name: str(r.name), org: str(r.org), desc: str(r.desc), order: i })),
        }),
      ]);
      return;
    }

    case "featured": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.featuredPick.deleteMany(),
        prisma.featuredPick.createMany({
          data: rows.map((r, i) => ({
            categorySlug: str(r.categorySlug),
            modelName: str(r.modelName),
            order: i,
          })),
        }),
      ]);
      return;
    }

    case "about": {
      const d = data as Any;
      await prisma.contentPage.upsert({
        where: { key: "about" },
        update: {
          intro: str(d.intro),
          paragraphs: J(arr(d.paragraphs).map(String)),
          values: J(arr(d.values)),
          stats: J(arr(d.stats)),
          points: [],
          steps: [],
        },
        create: {
          key: "about",
          intro: str(d.intro),
          paragraphs: J(arr(d.paragraphs).map(String)),
          values: J(arr(d.values)),
          stats: J(arr(d.stats)),
          points: [],
          steps: [],
        },
      });
      return;
    }

    case "ceki-demiri":
    case "proje-gelistirme": {
      const d = data as Any;
      await prisma.contentPage.upsert({
        where: { key: section },
        update: {
          intro: str(d.intro),
          points: J(arr(d.points)),
          steps: J(arr(d.steps)),
          paragraphs: [],
          values: [],
          stats: [],
        },
        create: {
          key: section,
          intro: str(d.intro),
          points: J(arr(d.points)),
          steps: J(arr(d.steps)),
          paragraphs: [],
          values: [],
          stats: [],
        },
      });
      return;
    }

    case "blog": {
      const rows = arr(data);
      await prisma.$transaction([
        prisma.blogPost.deleteMany(),
        prisma.blogPost.createMany({
          data: rows.map((r, i) => ({
            slug: str(r.slug) || `yazi-${i + 1}`,
            title: str(r.title),
            excerpt: str(r.excerpt),
            date: str(r.date),
            dateLabel: str(r.dateLabel),
            readingTime: str(r.readingTime),
            category: str(r.category),
            image: str(r.image),
            body: J(arr(r.body)),
            order: i,
          })),
        }),
      ]);
      return;
    }

    case "category": {
      // tek kategori güncelle — ürünlere (Model) DOKUNMAZ (onlar Ürünler bölümünden yönetilir)
      const d = data as Any;
      const slug = str(d.slug);
      const cat = await prisma.category.findUnique({ where: { slug } });
      if (!cat) throw new Error("Kategori bulunamadı");
      await prisma.category.update({
        where: { id: cat.id },
        data: {
          title: str(d.title),
          fullTitle: str(d.fullTitle),
          count: str(d.count),
          image: str(d.image),
          alt: str(d.alt),
          tagline: str(d.tagline),
          intro: str(d.intro),
          useCases: J(arr(d.useCases).map(String)),
          features: J(arr(d.features)),
          sampleSpecs: J(arr(d.sampleSpecs)),
        },
      });
      return;
    }

    case "products": {
      // Tüm ürünler (Model tablosu) — kategoriye göre yeniden kurulur
      const rows = arr(data);
      const cats = await prisma.category.findMany({ select: { id: true, slug: true } });
      const idBySlug = new Map(cats.map((c) => [c.slug, c.id]));
      const orderBy: Record<string, number> = {};
      const slugSeen: Record<string, Set<string>> = {};
      const toCreate = rows
        .map((r) => {
          const cslug = str(r.categorySlug);
          const categoryId = idBySlug.get(cslug);
          const name = str(r.name).trim();
          if (!categoryId || !name) return null;
          // kategori içinde benzersiz slug
          let slug = modelSlug(name);
          slugSeen[cslug] = slugSeen[cslug] || new Set();
          let base = slug, k = 2;
          while (slugSeen[cslug].has(slug)) slug = `${base}-${k++}`;
          slugSeen[cslug].add(slug);
          const order = (orderBy[cslug] = (orderBy[cslug] ?? 0));
          orderBy[cslug] = order + 1;
          return { categoryId, name, slug, desc: str(r.desc), order };
        })
        .filter((x): x is NonNullable<typeof x> => x != null);
      await prisma.$transaction([
        prisma.model.deleteMany(),
        prisma.model.createMany({ data: toCreate }),
      ]);
      return;
    }

    case "users": {
      const rows = arr(data);
      const users = rows
        .map((r) => ({
          phone: str(r.phone).replace(/\D/g, ""),
          name: str(r.name),
          role: str(r.role) === "superadmin" ? "superadmin" : "editor",
          active: r.active !== false,
        }))
        .filter((u) => u.phone.length >= 10);
      // en az bir aktif superadmin garantisi
      if (!users.some((u) => u.role === "superadmin" && u.active)) {
        throw new Error("En az bir aktif süper yönetici kalmalı.");
      }
      const phones = users.map((u) => u.phone);
      await prisma.$transaction([
        prisma.adminUser.deleteMany({ where: { phone: { notIn: phones } } }),
        ...users.map((u) =>
          prisma.adminUser.upsert({
            where: { phone: u.phone },
            update: { name: u.name, role: u.role, active: u.active },
            create: { phone: u.phone, name: u.name, role: u.role, active: u.active },
          }),
        ),
      ]);
      return;
    }

    default:
      throw new Error("Bilinmeyen bölüm: " + section);
  }
}
