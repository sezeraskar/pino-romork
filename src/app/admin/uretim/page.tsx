import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function UretimPage() {
  const rows = await prisma.craftPoint.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="craft"
      title="Üretim Maddeleri (Ana sayfa)"
      mode="collection"
      itemLabel="Madde"
      itemFields={[
        { key: "n", label: "No (ör. 01)", type: "text" },
        { key: "title", label: "Başlık", type: "text" },
        { key: "text", label: "Açıklama", type: "textarea", full: true },
      ]}
      initial={rows.map((r) => ({ n: r.n, title: r.title, text: r.text }))}
    />
  );
}
