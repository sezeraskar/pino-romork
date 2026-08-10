import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { getSite } from "@/lib/data";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: "Pino Karavan",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "2009'dan bu yana yerli üretim römork ve karavan imalatı. Hafif yük, araç taşıma, bot & tekne, canlı hayvan, ağır yük römorkları ve çeki demiri.",
    foundingDate: site.founded,
    telephone: site.phonePrimary.replace(/\s/g, ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Beykoz",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    sameAs: [
      "https://www.facebook.com/people/Pino-R%C3%B6mork-%C3%87eki-Demiri/100010391267818/",
      "https://www.instagram.com/pinoromork/",
      "https://www.youtube.com/channel/UCl5rlQ3zKvds5pj0IlsOizA",
    ],
  };

  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        {children}
      </body>
    </html>
  );
}
