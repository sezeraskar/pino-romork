import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getSite, getCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Pino Römork ile iletişime geçin. İstanbul Beykoz üretim tesisi, telefon, WhatsApp ve e-posta. Size özel römork ve karavan teklifi alın.",
  alternates: { canonical: "/iletisim" },
};

export default async function IletisimPage() {
  const [site, categories] = await Promise.all([getSite(), getCategories()]);
  const contactTopics = [
    ...categories.map((c) => c.fullTitle),
    "Çeki Demiri",
    "Karavan",
    "Proje Geliştirme",
    "Genel / Diğer",
  ];
  const mapSrc =
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(site.address) +
    "&t=&z=14&ie=UTF8&iwloc=&output=embed";
  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
  const telSecondary = `tel:${site.phoneSecondary.replace(/\s/g, "")}`;

  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">İletişim</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Projenizi birlikte <em>yola çıkaralım.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            İhtiyacınıza en uygun römork, karavan veya kişiye özel çözüm için
            formu doldurun ya da doğrudan bize ulaşın. Size özel teklif
            hazırlayalım.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* SOL: iletişim bilgileri */}
            <Reveal className="contact-info">
              <div className="ci-item">
                <span className="ci-label">Adres</span>
                <p>{site.address}</p>
              </div>
              <div className="ci-item">
                <span className="ci-label">Telefon</span>
                <a href={telPrimary}>{site.phonePrimary}</a>
                <a href={telSecondary}>{site.phoneSecondary}</a>
              </div>
              <div className="ci-item">
                <span className="ci-label">E-posta</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div className="ci-item">
                <span className="ci-label">WhatsApp</span>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  {site.phoneSecondary} — Hemen yazın
                </a>
              </div>
              <div className="ci-item">
                <span className="ci-label">Çalışma saatleri</span>
                <p>Pazartesi – Cumartesi · 09:00 – 18:30</p>
              </div>
            </Reveal>

            {/* SAĞ: form */}
            <Reveal className="contact-form-wrap">
              <h2 className="contact-form-title">Teklif formu</h2>
              <ContactForm topics={contactTopics} phone={site.phonePrimary} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* HARİTA */}
      <section className="map-section" aria-label="Konum haritası">
        <iframe
          title="Pino Römork konumu"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
