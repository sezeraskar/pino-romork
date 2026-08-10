import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function GuvenPage() {
  const rows = await prisma.trustStat.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="trust"
      title="Güven Rozetleri"
      mode="collection"
      itemLabel="Rozet"
      itemFields={[
        { key: "value", label: "Değer (ör. %100)", type: "text" },
        { key: "label", label: "Etiket", type: "text" },
      ]}
      initial={rows.map((r) => ({ value: r.value, label: r.label }))}
    />
  );
}
