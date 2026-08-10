import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhone, verifyOtp } from "@/lib/otp";
import { createSession, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const phone = normalizePhone(body.phone || "");
  const code = String(body.code || "").trim();

  const user = await prisma.adminUser.findUnique({ where: { phone } });
  if (!user || !user.active) {
    return NextResponse.json({ error: "Yetkisiz numara." }, { status: 403 });
  }

  const ok = await verifyOtp(phone, code);
  if (!ok) {
    return NextResponse.json({ error: "Kod hatalı veya süresi doldu." }, { status: 401 });
  }

  const token = await createSession({ phone: user.phone, name: user.name, role: user.role });
  const secure = req.headers.get("x-forwarded-proto") === "https";
  await setSessionCookie(token, secure);
  return NextResponse.json({ ok: true });
}
