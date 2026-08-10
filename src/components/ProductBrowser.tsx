"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "./icons";
import type { ProductItem } from "@/lib/content";

type Cat = { slug: string; title: string; modelCount: number };

export default function ProductBrowser({
  categories,
  productItems,
}: {
  categories: Cat[];
  productItems: ProductItem[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("kategori") ?? "all";
  const [active, setActive] = useState(initial);

  const items = useMemo(
    () =>
      active === "all"
        ? productItems
        : productItems.filter((p) => p.categorySlug === active),
    [active],
  );

  function select(slug: string) {
    setActive(slug);
    const url = slug === "all" ? "/urunler" : `/urunler?kategori=${slug}`;
    router.replace(url, { scroll: false });
  }

  const activeTitle =
    active === "all"
      ? null
      : categories.find((c) => c.slug === active)?.title;

  return (
    <div className="browse-layout">
      {/* SOL: kategori listesi (web) */}
      <aside className="browse-sidebar">
        <span className="browse-sidebar-title">Kategoriler</span>
        <ul>
          <li>
            <button
              className={`browse-item ${active === "all" ? "active" : ""}`}
              onClick={() => select("all")}
              aria-current={active === "all" ? "true" : undefined}
            >
              <span>Tümü</span>
              <span className="browse-item-count">{productItems.length}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <button
                className={`browse-item ${active === c.slug ? "active" : ""}`}
                onClick={() => select(c.slug)}
                aria-current={active === c.slug ? "true" : undefined}
              >
                <span>{c.title}</span>
                <span className="browse-item-count">{c.modelCount}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* SAĞ: ürünler */}
      <div className="browse-main">
        {/* Mobil dropdown */}
        <div className="browse-select-wrap">
          <label className="browse-select-label" htmlFor="kategori-select">
            Kategori
          </label>
          <select
            id="kategori-select"
            className="browse-select"
            value={active}
            onChange={(e) => select(e.target.value)}
          >
            <option value="all">Tümü ({productItems.length})</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title} ({c.modelCount})
              </option>
            ))}
          </select>
        </div>

        <p className="result-count">
          {items.length} ürün
          {activeTitle && <>{" · "}{activeTitle}</>}
        </p>

        <div className="product-grid">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.categorySlug}/${p.slug}`}
              className="product-card"
              aria-label={p.name}
            >
              <div className="product-thumb">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:760px) 50vw, (max-width:1024px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="product-cat">{p.categoryTitle}</span>
              </div>
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <span className="product-link">
                  İncele
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
