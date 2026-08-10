# Pino Römork — Sunucu Kurulumu (Node / PM2 / Nginx)

Site artık **statik export değil**; Node sunucusunda SSR + `/api/contact` (Resend e-posta) ile çalışır.

## Gereksinimler
- Node.js **22+**
- pnpm (`corepack enable` veya `npm i -g pnpm`)
- PM2 (`npm i -g pm2`)
- Nginx + Certbot (SSL)

## 1. Kod + bağımlılıklar
```bash
git clone https://github.com/sezeraskar/pino-romork.git
cd pino-romork
pnpm install --frozen-lockfile
```

## 2. Ortam değişkenleri
`.env.example`'ı kopyalayıp doldurun (Next `next start`'ta `.env`'i otomatik okur):
```bash
cp .env.example .env
# RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, PORT
```
> Resend'de gönderen domaini (pinoromork.com) doğrulanana kadar `CONTACT_FROM_EMAIL` için `onboarding@resend.dev` kullanılabilir.

## 3. Build
```bash
pnpm build
```

## 4. PM2 ile çalıştır
```bash
pm2 start "pnpm start" --name pino-web
pm2 save
```
`pnpm start` = `next start`; port `.env`'deki `PORT` (varsayılan 3411) üzerinden gelir.

Alternatif (daha hafif — standalone çıktı):
```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
PORT=3411 pm2 start .next/standalone/server.js --name pino-web
```

## 5. Nginx reverse proxy + SSL
`/etc/nginx/sites-available/pinoromork.com`:
```nginx
server {
  server_name pinoromork.com www.pinoromork.com;
  location / {
    proxy_pass http://127.0.0.1:3411;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```
```bash
ln -s /etc/nginx/sites-available/pinoromork.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d pinoromork.com -d www.pinoromork.com
```

## 6. Güncelleme (deploy)
```bash
cd pino-romork && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart pino-web
```

## SEO notları (geçiş)
- Domain **aynı** (pinoromork.com) → sıralama korunur; kategori/kurumsal URL'leri eski site ile birebir aynı.
- `www` ↔ kök domain birinde **301** ile tekilleştirin (canonical'lar köke bakıyor).
- Yayına aldıktan sonra Search Console'a `https://pinoromork.com/sitemap.xml` gönderin.
- Eski GitHub Pages kopyası artık güncellenmiyor; istenirse repo Pages ayarından kapatılabilir (canonical zaten pinoromork.com'a bakıyor).
