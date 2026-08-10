import { NextResponse } from "next/server";
import { Resend } from "resend";

// Node runtime (Resend server-side; API anahtarı asla client'a gitmez)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  ad?: string;
  telefon?: string;
  eposta?: string;
  konu?: string;
  mesaj?: string;
  // basit bot tuzağı (honeypot) — doldurulursa istek sessizce yutulur
  website?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Honeypot: bot doldurursa başarı taklidi yap, mail atma
  if (data.website) return NextResponse.json({ ok: true });

  const ad = (data.ad || "").trim();
  const telefon = (data.telefon || "").trim();
  if (!ad || !telefon) {
    return NextResponse.json(
      { error: "Ad Soyad ve telefon zorunludur." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-posta servisi henüz yapılandırılmadı." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@pinoromork.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Pino Römork <onboarding@resend.dev>";
  const konu = (data.konu || "Genel").trim();
  const eposta = (data.eposta || "").trim();
  const mesaj = (data.mesaj || "").trim();

  const rows: [string, string][] = [
    ["Ad Soyad", ad],
    ["Telefon", telefon],
    ["E-posta", eposta || "—"],
    ["İlgilendiği ürün", konu],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">Yeni teklif talebi</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 14px 6px 0;color:#666">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#666">Mesaj</p>
      <p style="margin:0;white-space:pre-wrap">${esc(mesaj) || "—"}</p>
    </div>`;

  const text =
    `Yeni teklif talebi\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMesaj:\n${mesaj || "—"}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: eposta || undefined,
      subject: `Teklif talebi — ${konu} · ${ad}`,
      html,
      text,
    });
    if (error) {
      return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 502 });
  }
}
