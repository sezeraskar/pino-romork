import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Çeki demiri satış-montaj-tescil, karavan, kişiye özel araç projelendirme, servis ve kiralama. Pino Römork'un römork üretiminin ötesindeki çözümleri.",
  alternates: { canonical: "/hizmetler" },
};

export default function HizmetlerPage() {
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Hizmetler</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Römorktan öteye, <em>tam çözüm.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            Üretimin yanında; çeki demiri montajı, karavan, kişiye özel
            projelendirme, servis ve kiralama çözümlerimizle yanınızdayız.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
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
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 25vw"
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

      <section className="cta-sec">
        <div className="wrap">
          <Reveal className="cta-in">
            <span className="eyebrow">İletişim</span>
            <h2>
              Size uygun <em>çözümü konuşalım.</em>
            </h2>
            <p>
              İhtiyacınıza en uygun hizmet için ekibimizle görüşün; size özel
              teklif hazırlayalım.
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
