import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pino Römork — Yönetim",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    // Login sayfası (oturum yok) — kabuk olmadan
    return <div className="ad-auth-wrap">{children}</div>;
  }

  return (
    <div className="ad-shell">
      <AdminNav name={session.name || session.phone} />
      <main className="ad-content">{children}</main>
    </div>
  );
}
