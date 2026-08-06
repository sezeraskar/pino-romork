"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArticleIcon,
  BuildingIcon,
  GridIcon,
  HomeIcon,
  PhoneIcon,
} from "./icons";

const tabs = [
  { label: "Ana Sayfa", href: "/", Icon: HomeIcon, match: (p: string) => p === "/" },
  { label: "Ürünler", href: "/urunler", Icon: GridIcon, match: (p: string) => p.startsWith("/urunler") },
  { label: "Kurumsal", href: "/kurumsal", Icon: BuildingIcon, match: (p: string) => ["/kurumsal", "/hakkimizda", "/belgelerimiz", "/ceki-demiri", "/proje-gelistirme"].some((h) => p.startsWith(h)) },
  { label: "Blog", href: "/blog", Icon: ArticleIcon, match: (p: string) => p.startsWith("/blog") },
  { label: "İletişim", href: "/iletisim", Icon: PhoneIcon, match: (p: string) => p.startsWith("/iletisim") },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav className="bottom-nav" aria-label="Mobil menü">
      {tabs.map(({ label, href, Icon, match }) => (
        <Link
          key={href}
          href={href}
          className={match(pathname) ? "active" : ""}
          aria-current={match(pathname) ? "page" : undefined}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
