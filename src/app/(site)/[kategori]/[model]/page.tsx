import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { modelSlug } from "@/lib/content";
import { getModel, getSite, waFor } from "@/lib/data";

const SITE_URL = "https://pinoromork.com";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; model: string }>;
}): Promise<Metadata> {
  const { kategori, model } = await params;
  const found = await getModel(kategori, model);
  if (!found) return { title: "Ürün bulunamadı" };
  const { category, model: m } = found;
  return {
    title: `${m.name} — ${category.fullTitle}`,
    description: `${m.name}: ${m.desc} ${category.fullTitle} kategorisinde siparişe özel üretim, uygun römork fiyatları ve Pino Römork güvencesi.`,
    keywords: [m.name, category.fullTitle, "römork", "römork fiyatları", "Pino Römork"],
    alternates: { canonical: `/${category.slug}/${model}` },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `${SITE_URL}/${category.slug}/${model}`,
      title: `${m.name} | Pino Römork`,
      description: m.desc,
      images: [{ url: category.image, width: 800, height: 1000, alt: m.name }],
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ kategori: string; model: string }>;
}) {
  const { kategori, model } = await params;
  const [found, site] = await Promise.all([getModel(kategori, model), getSite()]);
  if (!found) notFound();
  const { category: cat, model: m, index } = found;

  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
  const related = cat.models.filter((x) => x.name !== m.name).slice(0, 3);
  const subject = `${cat.fullTitle} — ${m.name}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: m.name,
    description: m.desc,
    image: `${SITE_URL}${cat.image}`,
    category: cat.fullTitle,
    brand: { "@type": "Brand", name: "Pino Römork" },
    manufacturer: { "@type": "Organization", name: "Pino Römork" },
    url: `${SITE_URL}/${cat.slug}/${model}`,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Ürünler", item: `${SITE_URL}/urunler` },
      { "@type": "ListItem", position: 3, name: cat.fullTitle, item: `${SITE_URL}/${cat.slug}` },
      { "@type": "ListItem", position: 4, name: m.name, item: `${SITE_URL}/${cat.slug}/${model}` },
    ],
  };

  return (
    <main className="subpage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <section className="cat-hero">
        <div className="wrap cat-hero-grid">
          <div className="cat-hero-copy">
            <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/urunler">Ürünler</Link>
              <span>/</span>
              <Link href={`/${cat.slug}`}>{cat.title}</Link>
              <span>/</span>
              <span aria-current="page">{m.name}</span>
            </Reveal>
            <Reveal as="span" className="eyebrow">
              {cat.fullTitle} · M{String(index + 1).padStart(2, "0")}
            </Reveal>
            <Reveal as="h1" className="page-title">
              {m.name}
            </Reveal>
            <Reveal as="p" className="page-lead">
              {m.desc}
            </Reveal>
            <Reveal as="p" className="page-lead" style={{ marginTop: 14 }}>
              {cat.intro}
            </Reveal>
            <Reveal className="cat-hero-cta">
              <a href={waFor(site.whatsappPhone, subject)} className="btn" target="_blank" rel="noopener noreferrer">
                Bu ürün için teklif alın
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
              alt={`${m.name} — ${cat.fullTitle}`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
        </div>
      </section>

      {/* FEATURES + USE CASES */}
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

      {/* SPECS */}
      <section className="section">
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
                aralıklardır. {m.name} modelinin kesin ölçü, dara, aks ve
                donanımı; yükünüze göre projelendirme aşamasında netleştirilir.
              </Reveal>
              <Reveal>
                <a href={waFor(site.whatsappPhone, subject)} className="btn" target="_blank" rel="noopener noreferrer">
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

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section section-alt">
          <div className="wrap">
            <div className="head">
              <Reveal as="h2">
                {cat.title} <em>serisinde</em>
              </Reveal>
              <Reveal as="p" className="head-r">
                Aynı kategorideki diğer modeller.
              </Reveal>
            </div>
            <div className="model-grid">
              {related.map((rm, i) => (
                <Reveal
                  as="a"
                  className="model-card"
                  key={rm.name}
                  delay={i * 40}
                  href={`/${cat.slug}/${modelSlug(rm.name)}`}
                  aria-label={rm.name}
                >
                  <div className="model-card-top">
                    <h3>{rm.name}</h3>
                    <p>{rm.desc}</p>
                  </div>
                  <span className="model-cta">
                    İncele
                    <ArrowUpRight />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
