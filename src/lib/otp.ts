import { prisma } from "./prisma";

// Telefonu normalize et: sadece rakam, başında 90 ile (TR)
export function normalizePhone(input: string): string {
  let d = (input || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  if (d.startsWith("90")) return d;
  if (d.length === 10) return "90" + d;
  return d;
}

const TEST_MODE = process.env.OTP_TEST_MODE !== "false"; // varsayılan: test modu
const TEST_CODE = "123456";

export async function createOtp(phone: string): Promise<string> {
  const code = TEST_MODE
    ? TEST_CODE
    : String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 dk
  await prisma.otpCode.create({ data: { phone, code, expiresAt } });

  if (!TEST_MODE) {
    // TODO: gerçek WhatsApp API entegrasyonu (şimdilik sunucu logu)
    console.log(`[OTP] ${phone} -> ${code}`);
    // await sendWhatsApp(phone, code);
  }
  return code;
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const now = new Date();
  const row = await prisma.otpCode.findFirst({
    where: { phone, used: false, expiresAt: { gt: now } },
    orderBy: { createdAt: "desc" },
  });
  const matches =
    (row && row.code === code) || (TEST_MODE && code === TEST_CODE);
  if (!matches) return false;
  // kullanılan/eski kodları geçersiz kıl
  await prisma.otpCode.updateMany({
    where: { phone, used: false },
    data: { used: true },
  });
  return true;
}

export { TEST_MODE as OTP_TEST_MODE };
