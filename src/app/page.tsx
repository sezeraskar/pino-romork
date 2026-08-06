import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import {
  blogPosts,
  craftPoints,
  featuredModels,
  homeAbout,
  products,
  services,
  site,
  trustStats,
} from "@/lib/content";

export default function Home() {
  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;

  return (
    <main id="top">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src={site.hero}
            alt="Pino Römork üretim bandından çıkan römork"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="wrap hero-in">
          <Reveal as="span" className="eyebrow">
            {site.founded} · İstanbul · Yerli Üretim
          </Reveal>
          <Reveal as="h1">
            Mobil <em>ekonomik</em>
            <br />
            çözümler.
          </Reveal>
          <Reveal as="p" className="lead">
            Her yükün ağırlığına ve amacına göre tasarlanmış römork ve
            karavanları, uluslararası kalite standartlarında tek bir çatı
            altında üretiyoruz.
          </Reveal>
          <Reveal className="hero-cta">
            <Link href="/urunler" className="btn">
              Ürünleri inceleyin
              <ArrowRight />
            </Link>
            <Link href="#iletisim" className="btn ghost">
              Teklif alın
            </Link>
          </Reveal>
        </div>
        <div className="scrollcue">Kaydırın</div>
      </section>

      {/* TRUST */}
      <div className="trust">
        <div className="wrap">
          <div className="trust-in">
            {trustStats.map((s) => (
              <div className="trust-item" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="section" id="urunler">
        <div className="wrap">
          <div className="head head-about">
            <div>
              <Reveal as="span" className="eyebrow">
                Kurumsal
              </Reveal>
              <Reveal as="h2" className="head-about-title">
                Hakkımızda
              </Reveal>
            </div>
            <Reveal as="div" className="head-r head-r-about">
              {homeAbout.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="products">
            {products.map((p) => (
              <Reveal as="a" className="pcard" key={p.title} href={p.href} aria-label={p.title}>
                <div className="thumb">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width:760px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="arrow">
                    <ArrowUpRight stroke="#101110" />
                  </div>
                  <div className="cap">
                    <h3>{p.title}</h3>
                    <span className="count">{p.count}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT / ÜRETİM */}
      <section className="section section-alt" id="uretim">
        <div className="wrap">
          <div className="craft">
            <Reveal className="craft-media">
              <Image
                src={site.craftImage}
                alt="Pino Römork yerli üretim tesisi"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
            <Reveal>
              <span className="eyebrow">Ürün Gamı</span>
              <h2>
                Her yük için,
                <br />
                <em>ölçüsünde bir römork.</em>
              </h2>
              <p className="craft-lead">
                Altı kategori, otuzdan fazla model. Hafif kargodan ağır tonaja,
                tekneden canlı hayvana kadar üretim bandımızdan çıkan çözümler.
              </p>
              <div className="craft-points">
                {craftPoints.map((cp) => (
                  <div className="cp" key={cp.n}>
                    <div className="n">{cp.n}</div>
                    <div>
                      <h4>{cp.title}</h4>
                      <p>{cp.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED MODELS */}
      <section className="section" id="model">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">
              Öne çıkan <em>modeller.</em>
            </Reveal>
            <Reveal as="p" className="head-r">
              Her kategoriden bir bayrak model. Mühendislik değerleriyle şeffaf;
              teknik özellikler satın alma kararınızı netleştirir.
            </Reveal>
          </div>
          <div className="fmodel-grid">
            {featuredModels.map((m, i) => (
              <Reveal
                as="a"
                className="fmodel-card"
                key={m.name}
                delay={i * 50}
                href={m.href}
                aria-label={m.name}
              >
                <div className="fmodel-media">
                  <span className="tag">{m.categoryTitle}</span>
                  <Image
                    src={m.image}
                    alt={`${m.name} — ${m.categoryTitle}`}
                    fill
                    sizes="(max-width:760px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="fmodel-body">
                  <h3>{m.name}</h3>
                  <p>{m.desc}</p>
                  <div className="fmodel-spec">
                    {m.specs.map(([k, v]) => (
                      <div className="fspec-row" key={k}>
                        <span>{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                  <span className="fmodel-more">
                    İncele
                    <ArrowUpRight />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-alt" id="hizmetler">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">
              Römorktan öteye,
              <br />
              <em>tam çözüm.</em>
            </Reveal>
            <Reveal as="p" className="head-r">
              Üretimin yanında; çeki demiri montajı, karavan, servis ve kişiye
              özel projelendirme.
            </Reveal>
          </div>
          <div className="service-cards">
            {services.map((s, i) => (
              <Reveal
                as="a"
                className="service-card"
                key={s.n}
                delay={i * 60}
                href={s.href}
                aria-label={s.title}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="service-cap">
                  <span className="service-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section" id="blog">
        <div className="wrap">
          <div className="head head-inline">
            <Reveal as="h2">
              Blog &amp; <em>rehberler.</em>
            </Reveal>
            <Reveal className="head-action">
              <Link href="/blog" className="btn ghost">
                Tümünü gör
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
          <div className="blog-grid blog-scroll">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Reveal
                as="a"
                className="blog-card"
                key={post.slug}
                href={`/blog/${post.slug}`}
                delay={i * 60}
                aria-label={post.title}
              >
                <div className="blog-thumb">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:760px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="blog-cat">{post.category}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.dateLabel}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-more">Devamını okuyun →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / İLETİŞİM */}
      <section className="cta-sec" id="iletisim">
        <div className="wrap">
          <Reveal className="cta-in">
            <span className="eyebrow">İletişim</span>
            <h2>
              Projenizi birlikte
              <br />
              <em>yola çıkaralım.</em>
            </h2>
            <p>
              İhtiyacınıza en uygun römork, karavan veya kişiye özel çözüm için
              ekibimizle görüşün. Size özel teklif hazırlayalım.
            </p>
            <div className="cta-actions">
              <a href={telPrimary} className="btn">
                {site.phonePrimary}
                <ArrowRight />
              </a>
              <a
                href={site.whatsapp}
                className="btn ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp&apos;tan yazın
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
