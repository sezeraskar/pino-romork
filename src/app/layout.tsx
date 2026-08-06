import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BottomNav from "@/components/BottomNav";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://pinoromork.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pino Römork — Mobil Ekonomik Çözümler | Yerli Üretim Römork & Karavan",
    template: "%s | Pino Römork",
  },
  description:
    "2009'dan bu yana yerli üretim, uluslararası kalite. Yüke özel mühendislikle üretilmiş hafif yük, araç taşıma, ağır yük, tekne ve canlı hayvan römorkları. Çeki demiri ve karavan çözümleri.",
  keywords: [
    "römork",
    "römork imalatı",
    "yük römorku",
    "araç taşıma römorku",
    "ağır yük römorku",
    "tekne römorku",
    "karavan",
    "çeki demiri",
    "Pino Römork",
    "İstanbul römork",
  ],
  authors: [{ name: "Pino Römork" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Pino Römork",
    title: "Pino Römork — Mobil Ekonomik Çözümler",
    description:
      "Yüke özel mühendislikle üretilmiş römork ve karavanlar. Yerli üretim, uluslararası kalite standartları.",
    images: [
      {
        url: "/images/agir-yuk-tasima-romorkleri.jpg",
        width: 385,
        height: 683,
        alt: "Pino Römork ağır yük taşıma römorku",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
        <BottomNav />
      </body>
    </html>
  );
}
