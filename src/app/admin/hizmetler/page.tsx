import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HizmetlerAdminPage() {
  const rows = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="services"
      title="Hizmetler"
      mode="collection"
      itemLabel="Hizmet"
      itemFields={[
        { key: "n", label: "No (ör. 01)", type: "text" },
        { key: "title", label: "Başlık", type: "text" },
        { key: "desc", label: "Açıklama", type: "textarea", full: true },
        { key: "href", label: "Bağlantı (/ceki-demiri veya https://…)", type: "text" },
        { key: "external", label: "Harici bağlantı (yeni sekme)", type: "checkbox" },
        { key: "image", label: "Görsel", type: "image", full: true },
      ]}
      initial={rows.map((r) => ({ n: r.n, title: r.title, desc: r.desc, href: r.href, external: r.external, image: r.image }))}
    />
  );
}
