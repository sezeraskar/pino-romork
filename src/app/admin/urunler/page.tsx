import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function UrunlerAdminPage() {
  const cats = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { models: { orderBy: { order: "asc" } } },
  });
  const slugs = cats.map((c) => c.slug);

  // Tüm ürünler kategori sırasına + kategori içi sıraya göre
  const products = cats.flatMap((c) =>
    c.models.map((m) => ({
      name: m.name,
      categorySlug: c.slug,
      desc: m.desc,
    })),
  );

  return (
    <>
      <p className="ad-hint">
        Tüm ürünler tek listede. Her ürünün adını, ait olduğu <b>kategoriyi</b> ve
        açıklamasını buradan yönetin; kategori detay sayfasında bu tablodaki
        ürünler listelenir. (URL, ürün adından otomatik üretilir.)
      </p>
      <AdminEditor
        section="products"
        title="Ürünler"
        mode="collection"
        itemLabel="Ürün"
        itemFields={[
          { key: "name", label: "Ürün adı", type: "text" },
          { key: "categorySlug", label: "Kategori", type: "select", options: slugs },
          { key: "desc", label: "Açıklama", type: "textarea", full: true },
        ]}
        initial={products}
      />
    </>
  );
}
