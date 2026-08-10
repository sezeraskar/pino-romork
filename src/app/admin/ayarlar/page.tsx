import AdminEditor, { type FieldDef } from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "name", label: "Marka adı", type: "text" },
  { key: "tagline", label: "Slogan", type: "text" },
  { key: "founded", label: "Kuruluş yılı", type: "text" },
  { key: "phonePrimary", label: "Telefon 1", type: "tel" },
  { key: "phoneSecondary", label: "Telefon 2", type: "tel" },
  { key: "email", label: "E-posta", type: "email" },
  { key: "whatsappPhone", label: "WhatsApp no (90…)", type: "tel" },
  { key: "address", label: "Adres", type: "textarea", full: true },
  { key: "heroImage", label: "Ana görsel (hero)", type: "image", full: true },
  { key: "craftImage", label: "Üretim görseli", type: "image", full: true },
  { key: "homeAbout", label: "Ana sayfa 'Hakkımızda' paragrafları", type: "stringlist", full: true },
];

export default async function AyarlarPage() {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const initial = {
    name: s?.name ?? "",
    tagline: s?.tagline ?? "",
    founded: s?.founded ?? "",
    phonePrimary: s?.phonePrimary ?? "",
    phoneSecondary: s?.phoneSecondary ?? "",
    email: s?.email ?? "",
    whatsappPhone: s?.whatsappPhone ?? "",
    address: s?.address ?? "",
    heroImage: s?.heroImage ?? "",
    craftImage: s?.craftImage ?? "",
    homeAbout: (s?.homeAbout as string[]) ?? [],
  };
  return (
    <AdminEditor section="settings" title="Site Ayarları" mode="object" fields={fields} initial={initial} />
  );
}
