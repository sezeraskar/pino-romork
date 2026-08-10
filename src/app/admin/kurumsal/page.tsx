import AdminEditor, { type FieldDef } from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const titleText: FieldDef = { key: "title", label: "Başlık", type: "text" };
const bodyText: FieldDef = { key: "text", label: "Metin", type: "textarea", full: true };
const stepFields: FieldDef[] = [
  { key: "n", label: "No", type: "text" },
  { key: "title", label: "Başlık", type: "text" },
  { key: "text", label: "Açıklama", type: "textarea", full: true },
];

export default async function KurumsalPage() {
  const [about, ceki, proje] = await Promise.all([
    prisma.contentPage.findUnique({ where: { key: "about" } }),
    prisma.contentPage.findUnique({ where: { key: "ceki-demiri" } }),
    prisma.contentPage.findUnique({ where: { key: "proje-gelistirme" } }),
  ]);

  return (
    <div className="ad-stack">
      <AdminEditor
        section="about"
        title="Hakkımızda / Kurumsal"
        mode="object"
        fields={[
          { key: "intro", label: "Giriş metni", type: "textarea", full: true },
          { key: "paragraphs", label: "Paragraflar", type: "stringlist", full: true },
          { key: "values", label: "Değerler", type: "repeater", full: true, itemFields: [titleText, bodyText] },
          { key: "stats", label: "İstatistikler", type: "repeater", full: true, itemFields: [
            { key: "value", label: "Değer", type: "text" },
            { key: "label", label: "Etiket", type: "text" },
          ] },
        ]}
        initial={{
          intro: about?.intro ?? "",
          paragraphs: (about?.paragraphs as string[]) ?? [],
          values: (about?.values as unknown[]) ?? [],
          stats: (about?.stats as unknown[]) ?? [],
        }}
      />

      <AdminEditor
        section="ceki-demiri"
        title="Çeki Demiri Sayfası"
        mode="object"
        fields={[
          { key: "intro", label: "Giriş metni", type: "textarea", full: true },
          { key: "points", label: "Bilinmesi gerekenler", type: "repeater", full: true, itemFields: [titleText, bodyText] },
          { key: "steps", label: "Tescil süreci adımları", type: "repeater", full: true, itemFields: stepFields },
        ]}
        initial={{
          intro: ceki?.intro ?? "",
          points: (ceki?.points as unknown[]) ?? [],
          steps: (ceki?.steps as unknown[]) ?? [],
        }}
      />

      <AdminEditor
        section="proje-gelistirme"
        title="Proje Geliştirme Sayfası"
        mode="object"
        fields={[
          { key: "intro", label: "Giriş metni", type: "textarea", full: true },
          { key: "steps", label: "Süreç adımları", type: "repeater", full: true, itemFields: stepFields },
        ]}
        initial={{
          intro: proje?.intro ?? "",
          steps: (proje?.steps as unknown[]) ?? [],
        }}
      />
    </div>
  );
}
