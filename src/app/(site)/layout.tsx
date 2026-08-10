import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BottomNav from "@/components/BottomNav";
import { getSite, getNav, getCategories } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [site, nav, categories] = await Promise.all([
    getSite(),
    getNav(),
    getCategories(),
  ]);
  const footerCats = categories.slice(0, 4).map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <>
      <Header nav={nav} />
      {children}
      <Footer site={site} categories={footerCats} />
      <WhatsAppFloat whatsapp={site.whatsapp} />
      <BottomNav />
    </>
  );
}
