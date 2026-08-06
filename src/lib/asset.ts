// public/ altındaki statik varlıklar için basePath'i elle ekler.
// GitHub Pages proje deposunda site /pino-romork altında servis edilir;
// next/image unoptimized modunda src'ye basePath eklemediği için gerekli.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
