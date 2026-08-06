import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { projeGelistirme, site, waFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proje Geliştirme — Kişiye Özel Araç Projelendirme",
  description:
    "Taşıyacağınız yüke, ölçüye ve kullanıma özel sıfırdan römork ve araç projelendirme. İhtiyaç analizinden teslimata mühendislik hizmeti.",
  alternates: { canonical: "/proje-gelistirme" },
};

export default function ProjeGelistirmePage() {
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
            <span aria-current="page">Proje Geliştirme</span>
          </Reveal>
          <Reveal as="span" className="eyebrow">
            Kişiye Özel · B2B
          </Reveal>
          <Reveal as="h1" className="page-title">
            Sıfırdan, <em>size özel projelendirme.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            {projeGelistirme.intro}
          </Reveal>
          <Reveal className="cat-hero-cta">
            <a href={waFor("Proje Geliştirme")} className="btn" target="_blank" rel="noopener noreferrer">
              Projenizi anlatın
              <ArrowRight />
            </a>
            <a href={telPrimary} className="btn ghost">
              {site.phonePrimary}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="head">
            <Reveal as="h2">Nasıl çalışıyoruz?</Reveal>
            <Reveal as="p" className="head-r">
              İhtiyaç analizinden teslimata, dört adımlı şeffaf bir süreç.
            </Reveal>
          </div>
          <div className="craft-points">
            {projeGelistirme.steps.map((s) => (
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
              Fikriniz var, <em>üretelim.</em>
            </h2>
            <p>
              Taşımak istediğiniz yükü ve beklentilerinizi anlatın; mühendislik
              ekibimiz en uygun çözümü tasarlasın.
            </p>
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
