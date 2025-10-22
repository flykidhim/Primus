// lib/auth.ts
import "server-only"; // prevent bundling into Edge/client
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "primus_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const s = process.env.ADMIN_COOKIE_SECRET;
  if (!s) throw new Error("ADMIN_COOKIE_SECRET is missing");
  return s;
}

function b64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function sign(value: string) {
  const h = crypto.createHmac("sha256", getSecret()).update(value).digest();
  return `${value}.${b64url(h)}`;
}
function verify(token: string) {
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const value = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = b64url(
    crypto.createHmac("sha256", getSecret()).update(value).digest()
  );
  if (sig !== expected) return null;
  return value;
}

/** Check admin cookie in the current server context (pages/layouts/actions). */
export async function isAdmin() {
  const c = await cookies();
  const raw = c.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  return !!verify(raw);
}

/** Check admin cookie on an incoming Request (API route handlers). */
export async function isAdminRequest(req: Request): Promise<boolean> {
  const header = req.headers.get("cookie");
  if (!header) return false;
  const cookie = getCookieFromHeader(header, COOKIE_NAME);
  if (!cookie) return false;
  return !!verify(cookie);
}

/** Guard helper for API routes. Returns a 401 response when not admin, else null. */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  const ok = await isAdminRequest(req);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** Attach a signed admin cookie to the response. */
export function withAdminCookie(res: NextResponse, adminId = "root") {
  const token = sign(`${adminId}:${Date.now()}`);
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

/** Clear admin cookie on the response. */
export function clearAdminCookieOn(res: NextResponse) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    expires: new Date(0),
    path: "/",
  });
  return res;
}

/* ------------------ small internal helpers ------------------ */

function getCookieFromHeader(header: string, name: string): string | null {
  // Simple, robust parse: split ; and find name=
  const parts = header.split(";").map((s) => s.trim());
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    const k = p.slice(0, eq);
    if (k === name) {
      const v = p.slice(eq + 1);
      try {
        return decodeURIComponent(v);
      } catch {
        return v;
      }
    }
  }
  return null;
}
