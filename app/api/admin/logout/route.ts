import { NextResponse } from "next/server";
import { clearAdminCookieOn } from "@/lib/auth";

export const runtime = "nodejs"; // ⬅️ important

export async function POST() {
  return clearAdminCookieOn(NextResponse.json({ ok: true }));
}
