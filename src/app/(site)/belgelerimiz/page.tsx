import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { getCertificates } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Belgelerimiz",
  description:
    "Pino Römork kalite ve uygunluk belgeleri: ISO 9001, Avrupa O1/O2 Tip Uygunluk, EC 94/20 çeki demiri onayı, NSAI ve SAE International standartları.",
  alternates: { canonical: "/belgelerimiz" },
};

export default async function BelgelerimizPage() {
  const certificates = await getCertificates();
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Belgelerimiz</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Belgeli üretim, <em>kanıtlı kalite.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            Ürünlerimiz, Avrupa onaylı karayolu uygunluk belgeleriyle üretilir.
            Aşağıdaki belge ve standartlar, her römorkun güvenlik ve kalite
            güvencesidir.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="feature-grid">
            {certificates.map((c, i) => (
              <Reveal className="cert-card" key={c.name} delay={i * 50}>
                <div className="cert-badge">{c.name}</div>
                <span className="cert-org">{c.org}</span>
                <p>{c.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="cert-note">
            Belge asılları ve geçerlilik detayları için bizimle iletişime
            geçebilirsiniz.
          </Reveal>
        </div>
      </section>

      <section className="cta-sec">
        <div className="wrap">
          <Reveal className="cta-in">
            <span className="eyebrow">İletişim</span>
            <h2>
              Detaylı bilgi <em>alın.</em>
            </h2>
            <p>Belgelerimiz ve üretim standartlarımız hakkında sorularınız için.</p>
            <div className="cta-actions">
              <Link href="/iletisim" className="btn">
                İletişime geçin
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
