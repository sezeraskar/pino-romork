import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const rows = await prisma.blogPost.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminEditor
      section="blog"
      title="Blog Yazıları"
      mode="collection"
      itemLabel="Yazı"
      itemFields={[
        { key: "title", label: "Başlık", type: "text" },
        { key: "slug", label: "Slug (URL)", type: "text" },
        { key: "category", label: "Kategori etiketi", type: "text" },
        { key: "dateLabel", label: "Tarih (görünen)", type: "text" },
        { key: "date", label: "Tarih (YYYY-AA-GG)", type: "text" },
        { key: "readingTime", label: "Okuma süresi", type: "text" },
        { key: "image", label: "Kapak görseli", type: "image", full: true },
        { key: "excerpt", label: "Özet", type: "textarea", full: true },
        { key: "body", label: "İçerik blokları", type: "blocklist", full: true },
      ]}
      initial={rows.map((r) => ({
        title: r.title,
        slug: r.slug,
        category: r.category,
        dateLabel: r.dateLabel,
        date: r.date,
        readingTime: r.readingTime,
        image: r.image,
        excerpt: r.excerpt,
        body: r.body,
      }))}
    />
  );
}
