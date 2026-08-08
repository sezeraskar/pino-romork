import Image from "next/image";
import Link from "next/link";
import { categories, site } from "@/lib/content";
import { asset } from "@/lib/asset";

const corporate = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Belgelerimiz", href: "/belgelerimiz" },
  { label: "Çeki Demiri", href: "/ceki-demiri" },
  { label: "Proje Geliştirme", href: "/proje-gelistirme" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Footer() {
  const telPrimary = `tel:${site.phonePrimary.replace(/\s/g, "")}`;
  const telSecondary = `tel:${site.phoneSecondary.replace(/\s/g, "")}`;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="foot-logo" aria-label="Pino Römork ana sayfa">
              <Image
                src={asset("/images/logo.png")}
                alt="Pino Römork"
                width={286}
                height={107}
              />
            </Link>
            <p>
              {site.tagline}. {site.founded}&apos;dan bu yana yerli üretim ve
              uluslararası kalite standartlarıyla römork ve karavan üretimi.
            </p>
          </div>
          <nav className="fcol" aria-label="Ürünler menüsü">
            <h5>Ürünler</h5>
            {categories.slice(0, 4).map((c) => (
              <Link href={`/${c.slug}`} key={c.slug}>
                {c.title}
              </Link>
            ))}
          </nav>
          <nav className="fcol" aria-label="Kurumsal menü">
            <h5>Kurumsal</h5>
            {corporate.map((n) => (
              <Link href={n.href} key={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="fcol">
            <h5>İletişim</h5>
            <p>{site.address}</p>
            <a href={telPrimary}>{site.phonePrimary}</a>
            <a href={telSecondary}>{site.phoneSecondary}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} — Tüm hakları saklıdır.
          </span>
          <span>Avrupa onaylı karayolu uygunluk belgeleriyle üretim.</span>
        </div>
      </div>
    </footer>
  );
}
