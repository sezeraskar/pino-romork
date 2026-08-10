import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BelgelerAdminPage() {
  const rows = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="certificates"
      title="Belgeler"
      mode="collection"
      itemLabel="Belge"
      itemFields={[
        { key: "name", label: "Belge adı", type: "text" },
        { key: "org", label: "Veren / kapsam", type: "text" },
        { key: "desc", label: "Açıklama", type: "textarea", full: true },
      ]}
      initial={rows.map((r) => ({ name: r.name, org: r.org, desc: r.desc }))}
    />
  );
}
