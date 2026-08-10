import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { getAbout, getSite } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "Pino Römork kurumsal: 2009'dan bu yana yerli üretim, uluslararası kalite. Hakkımızda, belgelerimiz ve değerlerimiz.",
  alternates: { canonical: "/kurumsal" },
};

const links = [
  {
    title: "Hakkımızda",
    desc: "2009'dan bu yana hikayemiz, ürün gamımız ve değerlerimiz.",
    href: "/hakkimizda",
  },
  {
    title: "Belgelerimiz",
    desc: "ISO 9001, O1/O2 Tip Uygunluk, EC 94/20 ve diğer kalite belgeleri.",
    href: "/belgelerimiz",
  },
];

export default async function KurumsalPage() {
  const [about, site] = await Promise.all([getAbout(), getSite()]);
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Kurumsal</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Yerli üretim, <em>uluslararası kalite.</em>
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
              <span className="eyebrow">Kurumsal</span>
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

      {/* ALT SAYFALAR */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">Kurumsal sayfalar</Reveal>
            <Reveal as="p" className="head-r">
              Şirketimizi daha yakından tanıyın.
            </Reveal>
          </div>
          <div className="kurumsal-links">
            {links.map((l, i) => (
              <Reveal
                as="a"
                className="kurumsal-card"
                key={l.href}
                href={l.href}
                delay={i * 60}
                aria-label={l.title}
              >
                <div>
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                </div>
                <span className="kurumsal-arrow">
                  <ArrowUpRight />
                </span>
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
            <p>İhtiyacınıza özel römork veya karavan çözümü için ekibimizle görüşün.</p>
            <div className="cta-actions">
              <Link href="/iletisim" className="btn">
                Teklif alın
                <ArrowRight />
              </Link>
              <Link href="/urunler" className="btn ghost">
                Ürünleri inceleyin
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
