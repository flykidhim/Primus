// app/api/admin/logout/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { clearAdminCookieOn } from "@/lib/auth";

export async function POST(req: Request) {
  // Clear the admin cookie and send user back to the login screen
  const url = new URL("/admin/login", req.url);
  const res = NextResponse.redirect(url);
  return clearAdminCookieOn(res);
}
