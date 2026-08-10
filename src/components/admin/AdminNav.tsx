"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Panel", exact: true },
  { href: "/admin/ayarlar", label: "Site Ayarları" },
  { href: "/admin/kategoriler", label: "Ürünler & Kategoriler" },
  { href: "/admin/one-cikan", label: "Öne Çıkan Modeller" },
  { href: "/admin/uretim", label: "Üretim Maddeleri" },
  { href: "/admin/guven", label: "Güven Rozetleri" },
  { href: "/admin/hizmetler", label: "Hizmetler" },
  { href: "/admin/belgeler", label: "Belgeler" },
  { href: "/admin/kurumsal", label: "Kurumsal Metinler" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/menu", label: "Menü" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
];

export default function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="ad-sidebar">
      <div className="ad-brand">PINO<b>.</b>RÖMORK <span>Yönetim</span></div>
      <nav className="ad-nav">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="ad-user">
        <span>{name}</span>
        <button onClick={logout}>Çıkış</button>
      </div>
    </aside>
  );
}
