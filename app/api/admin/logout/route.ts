// app/api/admin/logout/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { clearAdminCookieOn } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  return clearAdminCookieOn(res);
}
