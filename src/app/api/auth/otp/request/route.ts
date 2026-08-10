import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOtp, normalizePhone, OTP_TEST_MODE } from "@/lib/otp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const phone = normalizePhone(body.phone || "");
  if (phone.length < 12) {
    return NextResponse.json({ error: "Geçerli bir telefon girin." }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { phone } });
  if (!user || !user.active) {
    return NextResponse.json(
      { error: "Bu numara admin paneline yetkili değil." },
      { status: 403 },
    );
  }

  await createOtp(phone);
  return NextResponse.json({ ok: true, testMode: OTP_TEST_MODE });
}
