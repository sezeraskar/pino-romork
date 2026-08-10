import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OneCikanPage() {
  const [rows, cats] = await Promise.all([
    prisma.featuredPick.findMany({ orderBy: { order: "asc" } }),
    prisma.category.findMany({ include: { models: true }, orderBy: { order: "asc" } }),
  ]);
  const slugs = cats.map((c) => c.slug);
  const allModels = cats.flatMap((c) => c.models.map((m) => m.name));

  return (
    <>
      <p className="ad-hint">
        Ana sayfadaki &quot;Öne çıkan modeller&quot; için her kategoriden bir
        model seçin. Model adını ilgili kategorideki bir modelle birebir aynı
        yazın.
      </p>
      <AdminEditor
        section="featured"
        title="Öne Çıkan Modeller"
        mode="collection"
        itemLabel="Seçim"
        itemFields={[
          { key: "categorySlug", label: "Kategori", type: "select", options: slugs },
          { key: "modelName", label: "Model adı", type: "select", options: allModels },
        ]}
        initial={rows.map((r) => ({ categorySlug: r.categorySlug, modelName: r.modelName }))}
      />
    </>
  );
}
