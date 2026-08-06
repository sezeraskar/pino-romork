import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import {
  allProductParams,
  getCategory,
  getProduct,
  productItems,
  site,
  waFor,
} from "@/lib/content";

export function generateStaticParams() {
  return allProductParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const p = getProduct(model);
  if (!p) return { title: "Ürün bulunamadı" };
  return {
    title: `${p.name} — ${p.categoryFullTitle}`,
    description: `${p.name}: ${p.desc} ${p.categoryFullTitle} kategorisinde, siparişe özel üretim.`,
    alternates: { canonical: `/urunler/${p.slug}` },
    openGraph: {
      title: `${p.name} | Pino Römork`,
      description: p.desc,
      images: [{ url: p.image, width: 800, height: 1000, alt: p.name }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const p = getProduct(model);
  if (!p) notFound();
  const cat = getCategory(p.categorySlug)!;

  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
  const related = productItems
    .filter((x) => x.categorySlug === p.categorySlug && x.slug !== p.slug)
    .slice(0, 3);
  const subject = `${p.categoryFullTitle} — ${p.name}`;

  return (
    <main className="subpage">
      {/* HERO */}
      <section className="cat-hero">
        <div className="wrap cat-hero-grid">
          <div className="cat-hero-copy">
            <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/urunler">Ürünler</Link>
              <span>/</span>
              <Link href={`/urunler?kategori=${cat.slug}`}>{cat.title}</Link>
              <span>/</span>
              <span aria-current="page">{p.name}</span>
            </Reveal>
            <Reveal as="span" className="eyebrow">
              {p.categoryFullTitle}
            </Reveal>
            <Reveal as="h1" className="page-title">
              {p.name}
            </Reveal>
            <Reveal as="p" className="page-lead">
              {p.desc}
            </Reveal>
            <Reveal as="p" className="page-lead" style={{ marginTop: 14 }}>
              {cat.intro}
            </Reveal>
            <Reveal className="cat-hero-cta">
              <a href={waFor(subject)} className="btn" target="_blank" rel="noopener noreferrer">
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
              src={p.image}
              alt={`${p.name} — ${p.categoryFullTitle}`}
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
                aralıklardır. {p.name} modelinin kesin ölçü, dara, aks ve
                donanımı; yükünüze göre projelendirme aşamasında netleştirilir.
              </Reveal>
              <Reveal>
                <a href={waFor(subject)} className="btn" target="_blank" rel="noopener noreferrer">
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
            <div className="product-grid">
              {related.map((rm, i) => (
                <Link
                  key={rm.slug}
                  href={`/urunler/${rm.slug}`}
                  className="product-card"
                  aria-label={rm.name}
                >
                  <div className="product-thumb">
                    <Image
                      src={rm.image}
                      alt={rm.name}
                      fill
                      sizes="(max-width:760px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="product-cat">{rm.categoryTitle}</span>
                  </div>
                  <div className="product-info">
                    <h3>{rm.name}</h3>
                    <p>{rm.desc}</p>
                    <span className="product-link">
                      İncele
                      <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
