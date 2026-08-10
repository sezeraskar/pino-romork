import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function KategorilerPage() {
  const cats = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { models: true } } },
  });
  return (
    <div className="ad-editor">
      <div className="ad-editor-head">
        <h1>Ürünler & Kategoriler</h1>
      </div>
      <p className="ad-hint">
        Her kategorinin tüm alanlarını ve modellerini düzenlemek için seçin.
      </p>
      <div className="ad-list">
        {cats.map((c) => (
          <Link key={c.slug} href={`/admin/kategoriler/${c.slug}`} className="ad-list-item">
            <div>
              <b>{c.fullTitle}</b>
              <span>/{c.slug} · {c._count.models} model</span>
            </div>
            <span className="ad-arrow">Düzenle →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
