import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  const [cats, models, services, posts, users, certs] = await Promise.all([
    prisma.category.count(),
    prisma.model.count(),
    prisma.service.count(),
    prisma.blogPost.count(),
    prisma.adminUser.count(),
    prisma.certificate.count(),
  ]);

  const cards = [
    { label: "Kategori", value: cats, href: "/admin/kategoriler" },
    { label: "Ürün", value: models, href: "/admin/urunler" },
    { label: "Hizmet", value: services, href: "/admin/hizmetler" },
    { label: "Belge", value: certs, href: "/admin/belgeler" },
    { label: "Blog Yazısı", value: posts, href: "/admin/blog" },
    { label: "Kullanıcı", value: users, href: "/admin/kullanicilar" },
  ];

  return (
    <div className="ad-editor">
      <div className="ad-editor-head">
        <h1>Yönetim Paneli</h1>
        <a className="btn ghost" href="/" target="_blank" rel="noreferrer">Siteyi görüntüle ↗</a>
      </div>
      <p className="ad-hello">
        Hoş geldiniz, <b>{session?.name || session?.phone}</b>. Sol menüden tüm
        site içeriğini düzenleyebilirsiniz. Değişiklikler kaydedildiği anda
        yayına yansır.
      </p>
      <div className="ad-stats">
        {cards.map((c) => (
          <Link href={c.href} key={c.label} className="ad-stat">
            <b>{c.value}</b>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
