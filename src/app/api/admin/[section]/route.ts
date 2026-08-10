import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveSection } from "@/lib/admin-save";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ section: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const { section } = await params;
  const body = await req.json().catch(() => null);
  if (body == null) {
    return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });
  }
  try {
    await saveSection(section, body.data ?? body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Kaydedilemedi.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
