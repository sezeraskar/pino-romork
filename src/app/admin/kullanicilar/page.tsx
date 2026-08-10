import AdminEditor from "@/components/admin/AdminEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function KullanicilarPage() {
  const rows = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <p className="ad-hint">
        Panele WhatsApp OTP ile giriş yapabilecek kullanıcılar. Telefonu
        90XXXXXXXXXX biçiminde girin. En az bir aktif süper yönetici kalmalıdır.
      </p>
      <AdminEditor
        section="users"
        title="Kullanıcılar"
        mode="collection"
        itemLabel="Kullanıcı"
        itemFields={[
          { key: "name", label: "Ad Soyad", type: "text" },
          { key: "phone", label: "Telefon (90…)", type: "tel" },
          { key: "role", label: "Rol", type: "select", options: ["editor", "superadmin"] },
          { key: "active", label: "Aktif", type: "checkbox" },
        ]}
        initial={rows.map((r) => ({ name: r.name, phone: r.phone, role: r.role, active: r.active }))}
      />
    </>
  );
}
