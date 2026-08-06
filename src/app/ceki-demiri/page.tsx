import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { cekiDemiri, site, waFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Çeki Demiri — Satış, Montaj ve Tescil",
  description:
    "Avrupa E-belgeli (EC 94/20) çeki demiri satışı, araca özel montaj ve tescil süreci. Sabit veya sökülebilir tip, elektrik seti ve ruhsat güncelleme dahil.",
  alternates: { canonical: "/ceki-demiri" },
};

export default function CekiDemiriPage() {
  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;

  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span>Hizmetler</span>
            <span>/</span>
            <span aria-current="page">Çeki Demiri</span>
          </Reveal>
          <Reveal as="span" className="eyebrow">
            EC 94/20 · E-Belgeli
          </Reveal>
          <Reveal as="h1" className="page-title">
            Çeki Demiri <em>satış, montaj &amp; tescil.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            {cekiDemiri.intro}
          </Reveal>
          <Reveal className="cat-hero-cta">
            <a href={waFor("Çeki Demiri")} className="btn" target="_blank" rel="noopener noreferrer">
              Teklif alın
              <ArrowRight />
            </a>
            <a href={telPrimary} className="btn ghost">
              {site.phonePrimary}
            </a>
          </Reveal>
        </div>
      </section>

      {/* BİLGİLENDİRME */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">
              Bilmeniz <em>gerekenler.</em>
            </Reveal>
            <Reveal as="p" className="head-r">
              Çeki demiri, güvenlik ve tescil açısından kritik bir bağlantı
              elemanıdır.
            </Reveal>
          </div>
          <div className="feature-grid feature-grid-4">
            {cekiDemiri.points.map((p, i) => (
              <Reveal className="feature-card" key={p.title} delay={i * 60}>
                <span className="feature-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">Tescil süreci</Reveal>
            <Reveal as="p" className="head-r">
              Montajdan ruhsat güncellemesine, süreci sizin için yönetiyoruz.
            </Reveal>
          </div>
          <div className="craft-points">
            {cekiDemiri.steps.map((s) => (
              <Reveal className="cp" key={s.n}>
                <div className="n">{s.n}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="wrap">
          <Reveal className="cta-in">
            <span className="eyebrow">İletişim</span>
            <h2>
              Aracınıza uygun <em>çeki demiri.</em>
            </h2>
            <p>
              Marka ve modelinize özel çeki demiri, elektrik seti ve tescil için
              bize ulaşın.
            </p>
            <div className="cta-actions">
              <a href={waFor("Çeki Demiri")} className="btn" target="_blank" rel="noopener noreferrer">
                WhatsApp&apos;tan yazın
                <ArrowRight />
              </a>
              <Link href="/iletisim" className="btn ghost">
                İletişim
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
