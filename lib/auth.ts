// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE = "primus_admin";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SECRET = process.env.ADMIN_COOKIE_SECRET || "dev-admin-secret";

// --- tiny signed token ---
function b64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function sign(payload: object) {
  const json = JSON.stringify(payload);
  const body = b64url(Buffer.from(json));
  const mac = crypto.createHmac("sha256", SECRET).update(body).digest();
  const sig = b64url(mac);
  return `${body}.${sig}`;
}
function verify(token: string): false | Record<string, unknown> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const mac = crypto.createHmac("sha256", SECRET).update(body).digest();
  const expect = b64url(mac);
  if (expect !== sig) return false;
  try {
    const parsed = JSON.parse(
      Buffer.from(
        body.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString("utf8")
    );
    if (parsed && typeof parsed === "object") {
      if (
        "exp" in parsed &&
        typeof (parsed as any).exp === "number" &&
        Date.now() / 1000 > (parsed as any).exp
      ) {
        return false;
      }
      return parsed as Record<string, unknown>;
    }
    return false;
  } catch {
    return false;
  }
}

// --- public helpers used by routes/middleware ---

/** Check admin cookie on an incoming Request (API route handlers). */
export async function isAdminRequest(req: Request): Promise<boolean> {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(ADMIN_COOKIE + "="));
  if (!match) return false;
  const token = decodeURIComponent(match.split("=").slice(1).join("="));
  return !!verify(token);
}

/** Check admin cookie from middleware (NextRequest-like cookie store). */
export async function hasValidAdminCookieFrom(
  cookieValue?: string | null
): Promise<boolean> {
  if (!cookieValue) return false;
  return !!verify(cookieValue);
}

/** Set admin cookie on a NextResponse and return the same response. */
export function withAdminCookie(res: NextResponse): NextResponse {
  const now = Math.floor(Date.now() / 1000);
  const token = sign({
    sub: "admin",
    iat: now,
    exp: now + ADMIN_COOKIE_MAX_AGE,
  });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}

/** Clear admin cookie on a NextResponse and return the same response. */
export function clearAdminCookieOn(res: NextResponse): NextResponse {
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

/** Server action / RSC helper (when you need to read cookie server-side, not in API routes). */
export async function isAdminFromServerContext(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return !!verify(token);
}

/** Password check helper for login route. */
export async function checkAdminPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_BCRYPT || "";
  if (!hash) return false;
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}
