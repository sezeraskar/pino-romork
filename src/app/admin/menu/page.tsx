import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const rows = await prisma.navItem.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="nav"
      title="Üst Menü"
      mode="collection"
      itemLabel="Menü öğesi"
      itemFields={[
        { key: "label", label: "Etiket", type: "text" },
        { key: "href", label: "Bağlantı (/urunler, /blog …)", type: "text" },
      ]}
      initial={rows.map((r) => ({ label: r.label, href: r.href }))}
    />
  );
}
