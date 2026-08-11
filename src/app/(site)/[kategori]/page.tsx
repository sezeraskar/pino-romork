import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { modelSlug } from "@/lib/content";
import { getCategory, getCategories, getSite, waFor } from "@/lib/data";

const SITE_URL = "https://pinoromork.com";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const cat = await getCategory(kategori);
  if (!cat) return { title: "Sayfa bulunamadı" };
  const description = `${cat.fullTitle} — ${cat.intro} Siparişe özel üretim, uygun fiyat ve Avrupa onaylı belgelerle Pino Römork güvencesiyle.`;
  return {
    title: cat.fullTitle,
    description: description.slice(0, 300),
    keywords: [
      cat.fullTitle,
      cat.title,
      "römork",
      "römork fiyatları",
      "römork imalatı",
      "Pino Römork",
    ],
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `${SITE_URL}/${cat.slug}`,
      title: `${cat.fullTitle} | Pino Römork`,
      description: cat.intro,
      images: [{ url: cat.image, width: 800, height: 1000, alt: cat.alt }],
    },
  };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  const [cat, categories, site] = await Promise.all([
    getCategory(kategori),
    getCategories(),
    getSite(),
  ]);
  if (!cat) notFound();

  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
  const others = categories.filter((c) => c.slug !== cat.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Ürünler", item: `${SITE_URL}/urunler` },
      { "@type": "ListItem", position: 3, name: cat.fullTitle, item: `${SITE_URL}/${cat.slug}` },
    ],
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.fullTitle,
    itemListElement: cat.models.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.name,
      url: `${SITE_URL}/${cat.slug}/${modelSlug(m.name)}`,
    })),
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* HERO */}
      <section className="cat-hero">
        <div className="wrap cat-hero-grid">
          <div className="cat-hero-copy">
            <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/urunler">Ürünler</Link>
              <span>/</span>
              <span aria-current="page">{cat.title}</span>
            </Reveal>
            <Reveal as="span" className="eyebrow">
              {cat.count} · Siparişe Özel Üretim
            </Reveal>
            <Reveal as="h1" className="page-title">
              {cat.fullTitle}
            </Reveal>
            <Reveal as="p" className="cat-tagline accent">
              {cat.tagline}
            </Reveal>
            <Reveal as="p" className="page-lead">
              {cat.intro}
            </Reveal>
            <Reveal className="cat-hero-cta">
              <a href={waFor(site.whatsappPhone, cat.fullTitle)} className="btn" target="_blank" rel="noopener noreferrer">
                Teklif alın
                <ArrowRight />
              </a>
              <a href={telPrimary} className="btn ghost">
                {site.phonePrimary}
              </a>
            </Reveal>
          </div>
          <Reveal className="cat-hero-media">
            <Image
              src={cat.image}
              alt={cat.alt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
        </div>
      </section>

      {/* USE CASES + FEATURES */}
      <section className="section section-alt">
        <div className="wrap">
          <Reveal className="usecases">
            {cat.useCases.map((u) => (
              <span className="chip" key={u}>
                {u}
              </span>
            ))}
          </Reveal>
          <div className="feature-grid">
            {cat.features.map((f, i) => (
              <Reveal className="feature-card" key={f.title} delay={i * 60}>
                <span className="feature-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">{cat.fullTitle} Ürünleri</Reveal>
            <Reveal as="p" className="head-r">
              {cat.count} · Her ürün, taşıyacağı yüke göre ölçülendirilir ve
              siparişe özel donatılır.
            </Reveal>
          </div>
          <div className="product-grid">
            {cat.models.map((m, i) => (
              <Reveal
                as="a"
                className="product-card"
                key={m.name}
                delay={i * 40}
                href={`/${cat.slug}/${modelSlug(m.name)}`}
                aria-label={m.name}
              >
                <div className="product-thumb">
                  <Image
                    src={cat.image}
                    alt={m.name}
                    fill
                    sizes="(max-width:760px) 50vw, (max-width:1024px) 33vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="product-cat">{cat.title}</span>
                </div>
                <div className="product-info">
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <span className="product-link">
                    İncele
                    <ArrowUpRight />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="spec-block">
            <div className="spec-block-copy">
              <Reveal as="span" className="eyebrow">
                Teknik veriler
              </Reveal>
              <Reveal as="h2">
                Örnek <em>konfigürasyon.</em>
              </Reveal>
              <Reveal as="p" className="craft-lead">
                Aşağıdaki değerler {cat.fullTitle.toLowerCase()} için temsili
                aralıklardır. Kesin ölçü, dara, aks ve donanım; sipariş
                ettiğiniz modele ve yükünüze göre projelendirme aşamasında
                netleştirilir.
              </Reveal>
              <Reveal>
                <a href={waFor(site.whatsappPhone, cat.fullTitle)} className="btn" target="_blank" rel="noopener noreferrer">
                  Size özel teklif alın
                  <ArrowRight />
                </a>
              </Reveal>
            </div>
            <Reveal className="spec">
              {cat.sampleSpecs.map(([k, v]) => (
                <div className="row" key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* OTHER CATEGORIES */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">Diğer römork kategorileri</Reveal>
          </div>
          <div className="products">
            {others.slice(0, 3).map((c) => (
              <Reveal as="a" className="pcard" key={c.slug} href={`/${c.slug}`} aria-label={c.fullTitle}>
                <div className="thumb">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width:760px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="arrow">
                    <ArrowUpRight stroke="#101110" />
                  </div>
                  <div className="cap">
                    <h3>{c.title}</h3>
                    <span className="count">{c.count}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
