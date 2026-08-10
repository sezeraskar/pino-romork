import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import ProductBrowser from "@/components/ProductBrowser";
import { getCategories, getProductItems } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ürünler — Römork Modelleri",
  description:
    "Hafif yük, araç taşıma, bot & tekne, canlı hayvan, sektörel ticari satış ve ağır yük römorkları. Kategori seçin, size uygun modeli bulun.",
  alternates: { canonical: "/urunler" },
};

export default async function UrunlerPage() {
  const [categories, productItems] = await Promise.all([
    getCategories(),
    getProductItems(),
  ]);
  const cats = categories.map((c) => ({
    slug: c.slug,
    title: c.title,
    modelCount: c.models.length,
  }));
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Ürünler</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Her yük için, <em>ölçüsünde bir römork.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            Önce kategoriyi seçin; size uygun modeli listeden inceleyin. Tüm
            römorklar siparişe özel üretilir.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Suspense fallback={<p className="result-count">Yükleniyor…</p>}>
            <ProductBrowser categories={cats} productItems={productItems} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
