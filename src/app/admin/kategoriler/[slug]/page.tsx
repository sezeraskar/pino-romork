import Link from "next/link";
import { notFound } from "next/navigation";
import AdminEditor, { type FieldDef } from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "title", label: "Kısa başlık", type: "text" },
  { key: "fullTitle", label: "Tam başlık", type: "text" },
  { key: "count", label: "Model sayısı etiketi (ör. 8 model)", type: "text" },
  { key: "tagline", label: "Slogan", type: "text" },
  { key: "image", label: "Kategori görseli", type: "image", full: true },
  { key: "alt", label: "Görsel alt metni (SEO)", type: "text", full: true },
  { key: "intro", label: "Açıklama metni", type: "textarea", full: true },
  { key: "useCases", label: "Kullanım alanları", type: "stringlist", full: true },
  { key: "features", label: "Öne çıkan özellikler", type: "repeater", full: true, itemFields: [
    { key: "title", label: "Başlık", type: "text" },
    { key: "text", label: "Açıklama", type: "textarea", full: true },
  ] },
  { key: "sampleSpecs", label: "Örnek teknik tablo", type: "kvlist", full: true },
];

export default async function KategoriDuzenle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await prisma.category.findUnique({ where: { slug } });
  if (!c) notFound();

  const initial = {
    slug: c.slug,
    title: c.title,
    fullTitle: c.fullTitle,
    count: c.count,
    tagline: c.tagline,
    image: c.image,
    alt: c.alt,
    intro: c.intro,
    useCases: c.useCases as string[],
    features: c.features as unknown[],
    sampleSpecs: c.sampleSpecs as unknown[],
  };

  return (
    <div className="ad-stack">
      <Link href="/admin/kategoriler" className="ad-back">← Kategoriler</Link>
      <p className="ad-hint">Bu kategoriye ait ürünler <b>Ürünler</b> bölümünden yönetilir.</p>
      <AdminEditor
        section="category"
        title={`Kategori: ${c.fullTitle}  (/${c.slug})`}
        mode="object"
        fields={fields}
        initial={initial}
      />
    </div>
  );
}
