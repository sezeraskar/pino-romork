// Pino Römork — site içeriği (kaynak: pinoromork.com + pino/KAPSAM.md envanteri)
// Görseller public/images/ altında yerel olarak servis edilir.
import { asset } from "./asset";


export const site = {
  name: "Pino Römork",
  tagline: "Mobil Ekonomik Çözümler",
  founded: "2009",
  phonePrimary: "+90 216 606 20 03",
  phoneSecondary: "+90 541 257 77 92",
  email: "info@pinoromork.com",
  address:
    "Elmalı Mah. Keser Cad. Mürver Çıkmazı No:60/A, Beykoz — İstanbul",
  whatsappBase: "https://api.whatsapp.com/send?phone=905412577792&text=",
  whatsapp:
    "https://api.whatsapp.com/send?phone=905412577792&text=Merhaba,%20römork%20hakkında%20bilgi%20almak%20istiyorum.",
  hero: asset("/images/hero.jpg"),
  craftImage: asset("/images/uretim.jpg"),
};

/** Ürün hakkında WhatsApp mesajı üretir. */
export function waFor(subject: string): string {
  return (
    site.whatsappBase +
    encodeURIComponent(`Merhaba, ${subject} hakkında teklif almak istiyorum.`)
  );
}

export const nav = [
  { label: "Ürünler", href: "/urunler" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export const trustStats = [
  { value: "2009", label: "Kuruluş" },
  { value: "%100", label: "Yerli Üretim" },
  { value: "EC 94/20", label: "Çeki Demiri Onayı" },
  { value: "O1 · O2", label: "Tip Uygunluk" },
  { value: "%100", label: "Müşteri Memnuniyeti" },
];

export type Model = {
  name: string;
  desc: string;
};

export type Category = {
  slug: string;
  title: string; // kısa (kart) başlık
  fullTitle: string; // uzun başlık
  count: string;
  image: string;
  alt: string;
  tagline: string;
  intro: string;
  useCases: string[];
  features: { title: string; text: string }[];
  models: Model[];
  sampleSpecs: [string, string][];
};

export const categories: Category[] = [
  {
    slug: "hafif-yuk-romorkleri",
    title: "Hafif Yük Römorkları",
    fullTitle: "Hafif Yük Römorkleri",
    count: "8 model",
    image: asset("/images/cat/photo-hafif-yuk-romorkleri.jpg"),
    alt: "Pino hafif yük römorku — günlük taşıma için ekonomik çözüm",
    tagline: "Ekonomik, dayanıklı ve kullanımı kolay.",
    intro:
      "Küçük işletmeler, hobi kullanıcıları ve günlük taşıma ihtiyaçları için tasarlanmış hafif yük römorkları. Çelik ve alüminyum konstrüksiyonuyla bahçe atığından inşaat malzemesine kadar geniş bir yük yelpazesini güvenle taşır.",
    useCases: [
      "Bahçe ve peyzaj",
      "İnşaat malzemesi",
      "Kamp ve outdoor",
      "Genel nakliye",
    ],
    features: [
      { title: "Ekonomik", text: "Düşük dara, yüksek verim; günlük kullanımda ekonomik çözüm." },
      { title: "Kolay çekiş", text: "Hafif şasi yapısıyla binek araçlarla rahatça çekilir." },
      { title: "Paslanmaz konstrüksiyon", text: "Galvaniz ve kompozit panel seçenekleriyle uzun ömür." },
    ],
    models: [
      { name: "Flat Taban", desc: "Açık platform; her tür genel yük için çok yönlü taban." },
      { name: "Depar 200 Box", desc: "Kapalı kasa kompakt römork; küçük hacimli taşıma." },
      { name: "Depar 250", desc: "Orta boy kapalı kasa; artan hacim ihtiyacı için." },
      { name: "Depar 300", desc: "Geniş hacimli kapalı kasa römork." },
      { name: "Kamp Römorku", desc: "Outdoor ve kamp ekipmanı taşımaya uygun konfigürasyon." },
      { name: "Tente Kabinli Römork", desc: "Tente korumalı, esnek yükleme sağlayan model." },
      { name: "Kompozit Kabin Römork", desc: "Kompozit panel gövde; hafif ve dayanıklı." },
      { name: "Fiber Sandviç Panel Römork", desc: "Yalıtımlı fiber sandviç panel; premium kabin." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "750 – 1.300 kg"],
      ["Aks yapısı", "Tek aks"],
      ["Fren sistemi", "Frensiz / opsiyonel frenli"],
      ["Gövde", "Galvaniz çelik / kompozit panel"],
      ["Uygunluk belgesi", "O1 Tip Onayı"],
    ],
  },
  {
    slug: "arac-tasima-romorkleri",
    title: "Araç Taşıma",
    fullTitle: "Araç Taşıma Römorkleri",
    count: "5 model",
    image: asset("/images/cat/photo-arac-tasima-romorkleri.jpg"),
    alt: "Pino araç taşıma römorku — ATV, motosiklet ve otomobil taşıma",
    tagline: "Güvenli ve etkili araç taşıma.",
    intro:
      "Sağlam şasi, kaliteli fren sistemi ve güvenli sabitleme aparatlarıyla donatılmış araç taşıma römorkları. ATV'den motosiklete, otomobilden UTV'ye kadar aracınızı hasarsız ve güvenle taşır.",
    useCases: ["ATV / UTV", "Motosiklet", "Otomobil", "Yarış & etkinlik"],
    features: [
      { title: "Sağlam şasi", text: "Yüke göre hesaplanmış şasi ve süspansiyon." },
      { title: "Güvenli sabitleme", text: "Ray, rampa ve bağlama aparatlarıyla hasarsız taşıma." },
      { title: "Frenli seçenek", text: "Ağır araçlar için güvenli frenli aks yapısı." },
    ],
    models: [
      { name: "ATV-UTV Taşıma Römorku", desc: "ATV ve UTV araçları için rampalı taşıma." },
      { name: "ATV / UTV Kamp Römorku", desc: "Taşıma + kamp donanımını bir arada sunan model." },
      { name: "Motosiklet Taşıma Römorku", desc: "Tek/çoklu motosiklet için ray sistemli taşıma." },
      { name: "Motosiklet Garaj Römorku", desc: "Kapalı kabin; motosikleti korumalı taşır ve saklar." },
      { name: "Araba Taşıma Römorku", desc: "Otomobil taşıma için geniş platform ve rampa." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "1.300 – 3.000 kg"],
      ["Aks yapısı", "Tek / çift aks"],
      ["Fren sistemi", "Mekanik geri kaçışlı"],
      ["Donanım", "Rampa · sabitleme rayı · ırgat opsiyonu"],
      ["Uygunluk belgesi", "O1 / O2 Tip Onayı"],
    ],
  },
  {
    slug: "bot-ve-tekne-tasima-romorkleri",
    title: "Bot & Tekne Taşıma",
    fullTitle: "Bot ve Tekne Taşıma Römorkleri",
    count: "3 model",
    image: asset("/images/cat/photo-bot-ve-tekne-tasima-romorkleri.jpg"),
    alt: "Pino tekne ve jet ski taşıma römorku",
    tagline: "Su sporları için özel tasarım.",
    intro:
      "Su sporları ve denizcilik için özel tasarlanmış taşıma römorkları. Suya indirme ve çıkarmayı kolaylaştıran kızak sistemi ve korozyona dayanıklı malzemeleriyle jet ski ve teknelerinizi güvenle taşır.",
    useCases: ["Jet ski", "Şişme bot", "Tekne", "Marina lojistiği"],
    features: [
      { title: "Korozyona dayanıklı", text: "Deniz suyuna dayanıklı galvaniz konstrüksiyon." },
      { title: "Kolay indirme", text: "Kızak ve makara sistemiyle pratik suya indirme." },
      { title: "Ayarlanabilir yatak", text: "Farklı gövde boylarına uyum sağlayan destek yatakları." },
    ],
    models: [
      { name: "Jet Ski ve Bot Taşıma Römorku", desc: "Tekli jet ski veya şişme bot için taşıma." },
      { name: "2'li Jet Ski Taşıma Römorku", desc: "Yan yana iki jet ski taşıyan geniş şasi." },
      { name: "Tekne Taşıma Römorku", desc: "Ayarlanabilir yataklı, farklı boy teknelere uygun." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "750 – 2.000 kg"],
      ["Aks yapısı", "Tek / çift aks"],
      ["Gövde", "Sıcak daldırma galvaniz"],
      ["Donanım", "Kızak · makara · ayarlı yatak"],
      ["Uygunluk belgesi", "O1 / O2 Tip Onayı"],
    ],
  },
  {
    slug: "canli-hayvan-tasima-romorkleri",
    title: "Canlı Hayvan Taşıma",
    fullTitle: "Canlı Hayvan Taşıma Römorkleri",
    count: "3 model",
    image: asset("/images/cat/photo-canli-hayvan-tasima-romorkleri.jpg"),
    alt: "Pino canlı hayvan taşıma römorku — at ve köpek taşıma",
    tagline: "Konfor ve güvenlik önceliğiyle.",
    intro:
      "Hayvanların stresini azaltmaya yönelik özel iç mekân düzeni, havalandırma, yumuşak süspansiyon ve kaymaz zeminle tasarlanmış canlı hayvan taşıma römorkları. At, köpek ve çok amaçlı taşıma çözümleri.",
    useCases: ["At taşıma", "Köpek taşıma", "Çiftlik hayvanları", "Veteriner lojistiği"],
    features: [
      { title: "Havalandırma", text: "Hayvan sağlığı için etkin hava sirkülasyonu." },
      { title: "Yumuşak süspansiyon", text: "Titreşimi azaltan süspansiyonla konforlu yolculuk." },
      { title: "Kaymaz zemin", text: "Güvenli duruş için özel kaymaz taban kaplaması." },
    ],
    models: [
      { name: "At Taşıma Römorku", desc: "Tek/çift at için bölmeli, havalandırmalı taşıma." },
      { name: "Köpek Taşıma Römorku", desc: "Bölmeli, havalandırmalı köpek taşıma çözümü." },
      { name: "Çok Amaçlı Hayvan Taşıma Römorku", desc: "Farklı hayvan türlerine uyarlanabilir iç düzen." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "1.300 – 2.700 kg"],
      ["Aks yapısı", "Tek / çift aks"],
      ["İç donanım", "Bölme · havalandırma · kaymaz zemin"],
      ["Fren sistemi", "Mekanik geri kaçışlı"],
      ["Uygunluk belgesi", "O2 Tip Onayı"],
    ],
  },
  {
    slug: "sektorel-ticari-satis-romorkleri",
    title: "Sektörel Ticari Satış",
    fullTitle: "Sektörel Ticari Satış Römorkleri",
    count: "8 model",
    image: asset("/images/cat/photo-sektorel-ticari-satis-romorkleri.jpg"),
    alt: "Pino sektörel ticari satış römorku — mobil mutfak ve satış",
    tagline: "Taşınabilir ve işlevsel işletme.",
    intro:
      "Gıdadan giyime, hediyelik satıştan organizasyona kadar sektörel kullanım için taşınabilir ve işlevsel satış römorkları. İşletmenizi nereye giderseniz yanınızda taşıyın; siparişe özel iç donanımla teslim edilir.",
    useCases: ["Fast food", "Mobil mağaza", "Organizasyon", "Mobil ofis"],
    features: [
      { title: "Siparişe özel iç mekân", text: "İhtiyaca göre tezgâh, ekipman ve depolama düzeni." },
      { title: "Ruhsatlı çözüm", text: "Tescil ve ruhsatlandırmaya uygun projelendirme." },
      { title: "Anahtar teslim", text: "Elektrik, su ve donanımıyla kullanıma hazır teslim." },
    ],
    models: [
      { name: "Kapalı Kasa Depo Römorku", desc: "Güvenli depolama için kapalı kasa çözüm." },
      { name: "Fast Food Satış Römorku", desc: "Mobil yemek satışı için donanımlı mutfak römorku." },
      { name: "Organizasyon Römorkları", desc: "Etkinlik ve organizasyonlara özel kurulum." },
      { name: "Mobil Ofis Römorku", desc: "Saha ve şantiye için taşınabilir ofis." },
      { name: "Gezici Seminer Römorku", desc: "Sunum ve seminer için düzenlenmiş iç mekân." },
      { name: "Şarküteri Römorku", desc: "Soğutmalı satış için şarküteri konfigürasyonu." },
      { name: "Mobil Store Römorku", desc: "Perakende satış için mobil mağaza çözümü." },
      { name: "Özel Proje Römorkler", desc: "Tamamen size özel, sıfırdan projelendirme." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "1.300 – 3.500 kg"],
      ["Aks yapısı", "Tek / çift aks"],
      ["İç donanım", "Siparişe özel · elektrik & su tesisatı"],
      ["Gövde", "Sandviç panel / kompozit"],
      ["Uygunluk belgesi", "O1 / O2 Tip Onayı"],
    ],
  },
  {
    slug: "agir-yuk-tasima-romorkleri",
    title: "Ağır Yük Taşıma",
    fullTitle: "Ağır Yük Taşıma Römorkleri",
    count: "4 model",
    image: asset("/images/cat/photo-agir-yuk-tasima-romorkleri.jpg"),
    alt: "Pino ağır yük taşıma römorku — makine ve jeneratör taşıma",
    tagline: "Endüstriyel tonaj için güç.",
    intro:
      "Vinç sistemleri, rampalar ve sabitleme aparatlarıyla donatılmış ağır yük taşıma römorkları. Makine, jeneratör ve endüstriyel yükler ile tiny house şasileri için çift aks güç ve dayanıklılık sunar.",
    useCases: ["Makine & jeneratör", "İnşaat", "Tiny house şasi", "Endüstriyel lojistik"],
    features: [
      { title: "Çift aks güç", text: "Yüksek tonaj için çift aks frenli şasi." },
      { title: "Vinç & rampa", text: "Yükleme-boşaltma için vinç ve rampa sistemleri." },
      { title: "Tiny house şasi", text: "Tiny house üretimine uygun sertifikalı flat taban." },
    ],
    models: [
      { name: "Flat Taban Römork (Tiny House Şasi)", desc: "Tiny house üretimi için sertifikalı düz platform." },
      { name: "Makina ve Jeneratör Taşıma Römorku", desc: "Ağır ekipman için rampalı, sabitlemeli taşıma." },
      { name: "Kapalı Kabin Makina Taşıma Römorku", desc: "Korumalı kapalı kabinle makine taşıma." },
      { name: "Çift Aks Ağır Yük Taşıma Römorku", desc: "En yüksek tonaj için çift aks frenli çözüm." },
    ],
    sampleSpecs: [
      ["Azami yüklü ağırlık", "2.700 – 3.500 kg"],
      ["Dara ağırlığı", "≈ 640 kg"],
      ["Aks yapısı", "Çift aks · frenli"],
      ["Fren sistemi", "Mekanik geri kaçışlı"],
      ["Donanım", "Vinç · rampa · sabitleme"],
      ["Uygunluk belgesi", "O2 Tip Onayı"],
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

const TR_MAP: Record<string, string> = {
  ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o",
  ş: "s", Ş: "s", ü: "u", Ü: "u",
};

/** Türkçe karakter uyumlu slug üretir. */
export function slugify(input: string): string {
  return input
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function modelSlug(name: string): string {
  return slugify(name);
}

/** Kategori + model slug'ından modeli ve kategorisini döndürür. */
export function getModel(
  catSlug: string,
  mSlug: string,
): { category: Category; model: Model; index: number } | undefined {
  const category = getCategory(catSlug);
  if (!category) return undefined;
  const index = category.models.findIndex((m) => modelSlug(m.name) === mSlug);
  if (index === -1) return undefined;
  return { category, model: category.models[index], index };
}

/** Tüm kategori×model kombinasyonları (statik route üretimi için). */
export function allModelParams(): { slug: string; model: string }[] {
  return categories.flatMap((c) =>
    c.models.map((m) => ({ slug: c.slug, model: modelSlug(m.name) })),
  );
}

// Ana sayfa kategori kartları — SEO için eski yapıdaki kategori URL'lerine (/[kategori]) gider
export const products = categories.map((c) => ({
  title: c.title,
  count: c.count,
  image: c.image,
  alt: c.alt,
  href: `/${c.slug}`,
}));

// Düz ürün listesi (e-ticaret mantığı: tek listeleme + detay)
export type ProductItem = {
  slug: string;
  name: string;
  desc: string;
  categorySlug: string;
  categoryTitle: string;
  categoryFullTitle: string;
  image: string;
  index: number;
};

export const productItems: ProductItem[] = categories.flatMap((c) =>
  c.models.map((m, i) => ({
    slug: modelSlug(m.name),
    name: m.name,
    desc: m.desc,
    categorySlug: c.slug,
    categoryTitle: c.title,
    categoryFullTitle: c.fullTitle,
    image: c.image,
    index: i,
  })),
);

export function getProduct(slug: string): ProductItem | undefined {
  return productItems.find((p) => p.slug === slug);
}

export function allProductParams(): { model: string }[] {
  return productItems.map((p) => ({ model: p.slug }));
}

// Ana sayfada öne çıkan modeller — her kategoriden bir bayrak model
export const FEATURED_PICKS: Record<string, string> = {
  "hafif-yuk-romorkleri": "Kompozit Kabin Römork",
  "arac-tasima-romorkleri": "Araba Taşıma Römorku",
  "bot-ve-tekne-tasima-romorkleri": "Tekne Taşıma Römorku",
  "canli-hayvan-tasima-romorkleri": "At Taşıma Römorku",
  "sektorel-ticari-satis-romorkleri": "Fast Food Satış Römorku",
  "agir-yuk-tasima-romorkleri": "Çift Aks Ağır Yük Taşıma Römorku",
};

export const featuredModels = categories.map((c) => {
  const pick = FEATURED_PICKS[c.slug];
  const m = c.models.find((x) => x.name === pick) ?? c.models[0];
  return {
    categoryTitle: c.title,
    name: m.name,
    desc: m.desc,
    image: c.image,
    alt: c.alt,
    href: `/${c.slug}/${modelSlug(m.name)}`,
    specs: c.sampleSpecs.slice(0, 2) as [string, string][],
  };
});

// Ana sayfa "Hakkımızda" alanı metni
export const homeAbout = [
  "Pino Karavan, kuruluşundan (2009) bu yana kullanıcılara geniş bir ürün yelpazesi sunarak, römork ve karavan üretimlerindeki kalite ve vizyonuyla kısa sürede yerli pazarda en iyi konuma gelmiştir.",
  "ISO 9001 Kalite Yönetimi ve Uluslararası Onay Belgelerimizle ürün ve hizmetlerimizde kullanıcılarımıza her zaman en iyi performansı sunmayı hedeflemekteyiz. Uluslararası markalar ile rekabet edebilir konuma gelen ürünlerimiz, kullanıcıların memnuniyetleri sonucunda en çok tercih edilir duruma gelmiştir. Sipariş üzerine üretilen römorklarımız, farklı ihtiyaçlara uygun olarak tasarlanmaktadır.",
];

export const craftPoints = [
  {
    n: "01",
    title: "Yüke özel şasi mühendisliği",
    text: "Her model, taşıyacağı yükün ağırlığına ve amacına göre hesaplanır.",
  },
  {
    n: "02",
    title: "A kalite malzeme",
    text: "Çelik, alüminyum ve kompozit paneller uzun ömür için seçilir.",
  },
  {
    n: "03",
    title: "Belgeli üretim",
    text: "Avrupa onaylı karayolu uygunluk belgeleriyle üretim yapılır.",
  },
];

export const featured = {
  tag: "Ağır Yük Serisi",
  eyebrow: "Çift Aks · Frenli",
  title: "Çift Aks Ağır Yük Römorku",
  href: "/urunler/agir-yuk-tasima-romorkleri",
  image: asset("/images/agir-yuk-tasima-romorkleri.jpg"),
  lead: "Makine, jeneratör ve endüstriyel yükler için vinç sistemi, rampa ve sabitleme aparatlarıyla donatılmış ağır tonaj çözümü.",
  specs: [
    ["Azami yüklü ağırlık", "3.500 kg"],
    ["Dara ağırlığı", "640 kg"],
    ["Aks yapısı", "Çift aks · frenli"],
    ["Fren sistemi", "Mekanik geri kaçışlı"],
    ["Yükleme boyu", "4.200 mm"],
    ["Uygunluk belgesi", "O2 Tip Onayı"],
  ] as [string, string][],
};

// ---- Kurumsal & hizmet sayfaları ----

export const about = {
  intro:
    "Pino Römork, 2009 yılında İstanbul'da kurulmuş bir römork ve karavan üreticisidir. Kuruluşundan bu yana geniş ürün yelpazesi, mühendislik kalitesi ve vizyonuyla kısa sürede yerli pazarda öncü konuma gelmiştir.",
    paragraphs: [
    "Kapalı kasa yük römorklarından motosiklet, ATV ve UTV taşımaya; bot ve jet ski römorklarından ticari mobil mutfak ve ofis çözümlerine; tiny house şasilerinden canlı hayvan taşımaya kadar uzanan geniş bir ürün gamı sunuyoruz. Çeki demiri ve bağlantı aparatları da üretim ve montaj hizmetlerimiz arasında yer alır.",
    "Ürünlerimiz, başta Türkiye olmak üzere Avrupa ve dünyanın pek çok ülkesinde satılıyor. Uluslararası markalarla rekabet edebilir kaliteye ulaşan römorklarımız, sipariş üzerine ve her müşterinin ihtiyacına özel olarak üretiliyor.",
  ],
  values: [
    { title: "Müşteri güvenliği", text: "Her tasarımda önceliğimiz, yolda ve yükte güvenliktir." },
    { title: "Yerli üretim", text: "Tasarımdan teslimata tek elden, %100 yerli üretim." },
    { title: "Özelleştirme", text: "Standart değil; yükünüze ve işinize özel projelendirme." },
    { title: "Premium malzeme", text: "A kalite çelik, alüminyum ve kompozit paneller." },
  ],
  stats: [
    { value: "2009", label: "Kuruluş yılı" },
    { value: "6", label: "Ürün kategorisi" },
    { value: "30+", label: "Römork modeli" },
    { value: "%100", label: "Yerli üretim" },
  ],
};

export const certificates = [
  { name: "ISO 9001", org: "Kalite Yönetim Sistemi", desc: "Tüm üretim süreçlerinde uluslararası kalite yönetim standardı." },
  { name: "O1 Tip Uygunluk", org: "Avrupa Tip Onayı", desc: "750 kg'a kadar azami ağırlıktaki römorklar için AB tip onayı." },
  { name: "O2 Tip Uygunluk", org: "Avrupa Tip Onayı", desc: "750 – 3.500 kg arası römorklar için AB tip onayı." },
  { name: "EC 94/20", org: "Çeki Demiri Onayı", desc: "Mekanik bağlantı (çeki demiri) elemanları için Avrupa onayı." },
  { name: "NSAI", org: "Ulusal Standartlar Otoritesi", desc: "Bağımsız sertifikasyon kuruluşu tarafından doğrulama." },
  { name: "SAE International", org: "Mühendislik Standartları", desc: "Otomotiv mühendisliği dokümantasyon standartlarına uyum." },
];

export const cekiDemiri = {
  intro:
    "Çeki demiri, aracınıza römork veya karavan bağlamanızı sağlayan mekanik bağlantı elemanıdır. Pino Römork olarak Avrupa'dan E-belgeli (EC 94/20) onaylı, A kalite malzemeden üretilmiş çeki demirlerini araca özel projelendirme, montaj ve tescil süreciyle birlikte sunuyoruz.",
  points: [
    { title: "Zorunlu belge: EC 94/20", text: "Çeki demirinin AB onay belgesi olmalıdır. Belgesiz montaj hem güvenlik riski taşır hem de araç tescili yapılamaz." },
    { title: "Araca özel üretim", text: "Çeki demiri, aracınızın marka ve modeline özel tasarlanır; orijinal bağlantı noktalarına monte edilir ve araca zarar vermez." },
    { title: "Sabit veya sökülebilir", text: "İhtiyaca göre sabit ya da sökülebilir top (ball) tipi; sökülebilirde bağlantı noktası görünen veya gizli seçeneklerle." },
    { title: "Elektrik seti", text: "Çekici araçtan römork/karavan sinyalizasyonuna güç ve sinyal aktaran, universal veya araca özel elektrik seti." },
  ],
  steps: [
    { n: "01", title: "Projelendirme", text: "Aracınıza uygun çeki demiri ve elektrik seti belirlenir." },
    { n: "02", title: "Montaj", text: "Mekanik ve elektrik montajı yetkili servislerimizde yapılır." },
    { n: "03", title: "TSE muayene", text: "Proje belgesiyle bölge TSE araç muayene istasyonunda onay alınır." },
    { n: "04", title: "Ruhsat güncelleme", text: "Onay sonrası noterde ruhsatınıza çeki demiri işlenir." },
  ],
};

export const projeGelistirme = {
  intro:
    "Araç projelendirme, tamamen size özel sunulan bir mühendislik hizmetidir. Talebiniz doğrultusunda; taşınacak yüke, uzunluğa ve genişliğe uygun şekilde sıfırdan tasarım yapılır. İç donanım, ihtiyaçlarınıza göre hazırlanır.",
  steps: [
    { n: "01", title: "İhtiyaç analizi", text: "Taşıyacağınız yük, kullanım senaryosu ve beklentileriniz belirlenir." },
    { n: "02", title: "Tasarım & mühendislik", text: "Şasi, aks, fren ve iç donanım yüke göre hesaplanır ve tasarlanır." },
    { n: "03", title: "Üretim", text: "A kalite malzemeyle, belgeli üretim süreçlerinde imal edilir." },
    { n: "04", title: "Teslim & tescil", text: "Uygunluk belgeleriyle birlikte kullanıma hazır teslim edilir." },
  ],
};

// ---- Blog / Rehberler ----

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  dateLabel: string;
  readingTime: string;
  category: string;
  image: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "romork-seciminde-dikkat-edilmesi-gerekenler",
    title: "Römork Seçiminde Dikkat Edilmesi Gerekenler",
    excerpt:
      "Doğru römork; taşıyacağınız yüke, çekici aracınıza ve yasal gerekliliklere göre seçilir. Satın almadan önce göz önünde bulundurmanız gereken 7 başlık.",
    date: "2026-07-20",
    dateLabel: "20 Temmuz 2026",
    readingTime: "5 dk okuma",
    category: "Rehber",
    image: asset("/images/hafif-yuk-romorkleri.jpg"),
    body: [
      { type: "p", text: "Römork, bir kez alınıp uzun yıllar kullanılan bir yatırımdır. Yanlış seçim; hem güvenlik riski hem de kullanışsız bir üründe kalan para demektir. Doğru römorku seçmek için önce ihtiyacınızı, sonra aracınızı ve yasal çerçeveyi netleştirmeniz gerekir. İşte satın almadan önce dikkat edilmesi gereken başlıklar." },
      { type: "h2", text: "1. Taşıyacağınız yükü netleştirin" },
      { type: "p", text: "Her römork bir amaca göre tasarlanır. Bahçe atığı taşıyan biriyle jet ski taşıyan birinin ihtiyacı tamamen farklıdır. Önce ne taşıyacağınızı, ortalama ve azami ağırlığını, boyutlarını belirleyin. Yükün cinsi (açık yük, hassas ekipman, canlı hayvan) römorkun tipini doğrudan belirler." },
      { type: "h2", text: "2. Azami yüklü ağırlığa dikkat edin" },
      { type: "p", text: "Römorkun taşıyabileceği azami ağırlık (dara + yük), en kritik teknik değerdir. Yükünüzün üzerinde bir kapasiteyle çalışmak hem güvenli hem de römorkun ömrü için daha iyidir. Kapasitenin sınırında sürekli kullanım, aks ve şasi yorgunluğuna yol açar." },
      { type: "h2", text: "3. Çekici aracınızla uyumu kontrol edin" },
      { type: "ul", items: [
        "Aracınızın çekebileceği azami römork ağırlığı (frenli/frensiz) ruhsatta ve kullanım kılavuzunda yazar.",
        "Frensiz römorklar genellikle daha düşük tonajlıdır; ağır yükler için frenli aks şarttır.",
        "Aracınızda uygun (EC 94/20 onaylı) bir çeki demiri bulunmalıdır.",
      ] },
      { type: "h2", text: "4. Tek aks mı, çift aks mı?" },
      { type: "p", text: "Tek aks daha hafif ve manevra kabiliyeti yüksektir; hafif yükler için idealdir. Çift aks ise yüksek tonajda daha dengeli ve güvenli taşıma sağlar, uzun yol ve ağır yük için tercih edilir." },
      { type: "h2", text: "5. Fren sistemi" },
      { type: "p", text: "Belirli bir ağırlığın üzerindeki römorklarda fren sistemi yasal olarak zorunludur. Mekanik geri kaçışlı fren sistemi, yavaşlarken römorkun aracı itmesini engelleyerek güvenli sürüş sağlar." },
      { type: "h2", text: "6. Malzeme ve üretim kalitesi" },
      { type: "p", text: "Galvaniz çelik, alüminyum ve kompozit paneller; korozyona karşı dayanıklılık ve uzun ömür için önemlidir. Kaynak kalitesi, zemin malzemesi ve bağlantı elemanları, römorkun yıllar içindeki performansını belirler." },
      { type: "h2", text: "7. Belgeler ve tescil" },
      { type: "p", text: "Römorkun Avrupa Tip Uygunluk (O1/O2) belgeleri ve karayolu uygunluğu olmalıdır. Belgesiz bir römork trafiğe tescil edilemez. Satın almadan önce üreticiden belgeleri talep edin." },
      { type: "p", text: "Pino Römork olarak, ihtiyacınızı birlikte analiz edip size en uygun modeli öneriyor; siparişe özel üretim ve belgeli teslim sağlıyoruz. Kararsız kaldığınız her noktada bize danışabilirsiniz." },
    ],
  },
  {
    slug: "romork-fiyatlari",
    title: "Römork Fiyatları Neye Göre Belirlenir?",
    excerpt:
      "Römork fiyatını belirleyen tek şey boyut değildir. Malzeme, aks yapısı, donanım ve belgelendirme fiyatı doğrudan etkiler. Fiyatın arkasındaki kalemler.",
    date: "2026-07-10",
    dateLabel: "10 Temmuz 2026",
    readingTime: "4 dk okuma",
    category: "Bilgi",
    image: asset("/images/agir-yuk-tasima-romorkleri.jpg"),
    body: [
      { type: "p", text: "\"Römork ne kadar?\" sorusunun tek bir cevabı yoktur; çünkü römork fiyatı, aynı bir araç fiyatı gibi, konfigürasyona göre değişir. Aynı kategoride iki römork arasında ciddi fiyat farkı olabilir. Bu farkı yaratan kalemleri bilmek, bütçenizi doğru planlamanıza yardımcı olur." },
      { type: "h2", text: "Boyut ve taşıma kapasitesi" },
      { type: "p", text: "Römorkun ebatları ve azami yüklü ağırlığı, kullanılan çelik miktarını ve şasi mühendisliğini doğrudan etkiler. Daha büyük ve yüksek tonajlı römorklar, daha güçlü şasi ve aks gerektirdiği için doğal olarak daha yüksek maliyetlidir." },
      { type: "h2", text: "Aks ve fren sistemi" },
      { type: "p", text: "Tek aks yerine çift aks, frensiz yerine frenli sistem tercih edildiğinde fiyat artar. Ancak bu, ağır ve güvenli taşıma için gerekli bir yatırımdır." },
      { type: "h2", text: "Malzeme kalitesi" },
      { type: "ul", items: [
        "Galvaniz (sıcak daldırma) çelik, boyalı çeliğe göre daha pahalı ama çok daha uzun ömürlüdür.",
        "Alüminyum ve kompozit paneller hafiflik ve korozyon direnci sağlar; fiyatı yükseltir.",
        "Zemin kaplaması, kenar profilleri ve bağlantı elemanlarının kalitesi de maliyete yansır.",
      ] },
      { type: "h2", text: "Donanım ve iç ekipman" },
      { type: "p", text: "Rampa, vinç, sabitleme rayı, tente, kapalı kabin, havalandırma, elektrik ve su tesisatı gibi eklentiler fiyatı belirler. Özellikle sektörel satış ve canlı hayvan römorklarında iç donanım, toplam fiyatın önemli bir kısmını oluşturabilir." },
      { type: "h2", text: "Belgelendirme ve tescil" },
      { type: "p", text: "Avrupa Tip Uygunluk belgeleri, kaliteli üretimin ve yasal kullanımın güvencesidir. Belgeli üretim, kayıt dışı ürünlere göre bir miktar daha maliyetli olsa da tescil ve güvenlik açısından zorunludur." },
      { type: "p", text: "En doğru fiyatı öğrenmenin yolu, ihtiyacınızı netleştirip teklif almaktır. Pino Römork olarak, kullanım amacınıza göre en ekonomik ve doğru konfigürasyonu birlikte belirliyoruz." },
    ],
  },
  {
    slug: "mobil-mutfak",
    title: "Mobil Mutfak Römorku ile İşinizi Yola Çıkarın",
    excerpt:
      "Sabit bir dükkânın maliyeti olmadan, müşterinin olduğu her yerde satış yapmak mümkün. Mobil mutfak römorkunun avantajları ve dikkat edilmesi gerekenler.",
    date: "2026-06-28",
    dateLabel: "28 Haziran 2026",
    readingTime: "4 dk okuma",
    category: "İş Fikri",
    image: asset("/images/sektorel-ticari-satis-romorkleri.jpg"),
    body: [
      { type: "p", text: "Yemek işine girmek isteyen çoğu girişimcinin önündeki en büyük engel, sabit bir mekânın kira ve tadilat maliyetidir. Mobil mutfak römorku, bu maliyeti ortadan kaldırıp işinizi doğrudan müşterinin ayağına götürmenizi sağlar. Festivaller, pazarlar, iş merkezleri ve etkinlikler; işletmenizin yeni adresi olabilir." },
      { type: "h2", text: "Neden mobil mutfak?" },
      { type: "ul", items: [
        "Düşük başlangıç maliyeti: Sabit dükkân kirası ve yüksek tadilat gideri yok.",
        "Esneklik: Talebin yoğun olduğu yere gidersiniz; konumunuzu değiştirebilirsiniz.",
        "Görünürlük: Etkinlik ve kalabalık noktalarda doğrudan müşteriye ulaşırsınız.",
        "Marka: Tasarımıyla dikkat çeken bir römork, gezen bir reklam panosudur.",
      ] },
      { type: "h2", text: "İç donanımda nelere dikkat etmeli?" },
      { type: "p", text: "Mobil mutfağın kalbi iç donanımıdır. Pişirme ekipmanı, soğutma, tezgâh düzeni, havalandırma, su ve elektrik tesisatı; yapacağınız işe göre planlanmalıdır. İyi bir yerleşim, dar alanda verimli çalışmanızı sağlar." },
      { type: "h2", text: "Ruhsat ve hijyen" },
      { type: "p", text: "Ticari kullanım için römorkun tescilli ve ilgili gıda/hijyen standartlarına uygun olması gerekir. Projelendirme aşamasında bu gereklilikleri göz önünde bulundurmak, sonradan sorun yaşamanızı engeller." },
      { type: "h2", text: "Size özel projelendirme" },
      { type: "p", text: "Pino Römork olarak fast food, şarküteri, kahve veya özel konseptiniz ne olursa olsun; mobil mutfak römorkunuzu iş modelinize göre sıfırdan projelendiriyoruz. Fikrinizi anlatın, birlikte yola çıkaralım." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const services = [
  {
    n: "01",
    title: "Çeki Demiri",
    desc: "Avrupa E-belgeli (EC 94/20) çeki demiri satışı, montaj ve tescil süreci.",
    href: "/ceki-demiri",
    external: false,
    image: asset("/images/hizmet/ceki-demiri.jpg"),
  },
  {
    n: "02",
    title: "Karavan",
    desc: "Özgürlüğü yola taşıyan, ergonomik iç mekânlı Pino karavanlar.",
    href: "https://pinokaravan.com/tr?lang=tr",
    external: true,
    image: asset("/images/hizmet/karavan.jpg"),
  },
  {
    n: "03",
    title: "Araç Projelendirme",
    desc: "Talebiniz doğrultusunda, kişiye özel araç ve römork mühendisliği.",
    href: "/proje-gelistirme",
    external: false,
    image: asset("/images/hizmet/arac-projelendirme.jpg"),
  },
  {
    n: "04",
    title: "Servis & Kiralama",
    desc: "Bakım-onarım servisi; kiralık mobil mutfak ve mobil ofis çözümleri.",
    href: "https://www.karavanservisim.com/",
    external: true,
    image: asset("/images/hizmet/servis-kiralama.jpg"),
  },
];
