import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "pino_admin";
const secretKey = () =>
  new TextEncoder().encode(process.env.AUTH_SECRET || "dev-insecure-secret-change-me");

export type Session = {
  phone: string;
  name: string;
  role: string;
};

export async function createSession(user: Session): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.phone === "string" && typeof payload.role === "string") {
      return {
        phone: payload.phone,
        name: (payload.name as string) || "",
        role: payload.role,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string, secure = false) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const SESSION_COOKIE = COOKIE;
