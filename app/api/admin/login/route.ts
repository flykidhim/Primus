// app/api/admin/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { checkAdminPassword, withAdminCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();
  const ok = await checkAdminPassword(String(password || ""));
  if (!ok) return NextResponse.json({ error: "Invalid" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  return withAdminCookie(res);
}
