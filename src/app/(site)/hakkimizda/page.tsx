import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { getAbout, getSite } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Pino Römork, 2009'dan bu yana İstanbul'da römork ve karavan üretiyor. Yerli üretim, uluslararası kalite ve siparişe özel mühendislik.",
  alternates: { canonical: "/hakkimizda" },
};

export default async function HakkimizdaPage() {
  const [about, site] = await Promise.all([getAbout(), getSite()]);
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Hakkımızda</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            2009&apos;dan bu yana <em>yolun üstünde.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            {about.intro}
          </Reveal>
        </div>
      </section>

      {/* İSTATİSTİK */}
      <div className="trust">
        <div className="wrap">
          <div className="trust-in">
            {about.stats.map((s) => (
              <div className="trust-item" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HİKAYE + GÖRSEL */}
      <section className="section">
        <div className="wrap">
          <div className="craft">
            <Reveal className="craft-media">
              <Image
                src={site.craftImage}
                alt="Pino Römork üretim tesisi"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
            <Reveal>
              <span className="eyebrow">Hikayemiz</span>
              <h2>
                Tasarımdan teslimata,
                <br />
                <em>tek elden.</em>
              </h2>
              {about.paragraphs.map((p, i) => (
                <p className="craft-lead" key={i}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">
              Değerlerimiz
            </Reveal>
            <Reveal as="p" className="head-r">
              Her römorkun arkasında duran ilkeler.
            </Reveal>
          </div>
          <div className="feature-grid feature-grid-4">
            {about.values.map((v, i) => (
              <Reveal className="feature-card" key={v.title} delay={i * 60}>
                <span className="feature-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="wrap">
          <Reveal className="cta-in">
            <span className="eyebrow">İletişim</span>
            <h2>
              Sizin için de <em>üretelim.</em>
            </h2>
            <p>
              İhtiyacınıza özel römork veya karavan çözümü için ekibimizle
              görüşün.
            </p>
            <div className="cta-actions">
              <Link href="/iletisim" className="btn">
                Teklif alın
                <ArrowRight />
              </Link>
              <Link href="/belgelerimiz" className="btn ghost">
                Belgelerimiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
