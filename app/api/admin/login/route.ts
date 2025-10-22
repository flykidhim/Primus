import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { withAdminCookie } from "@/lib/auth";

export const runtime = "nodejs"; // ⬅️ important

export async function POST(req: Request) {
  const { password } = await req.json();
  const hash = process.env.ADMIN_PASSWORD_BCRYPT || "";
  if (!hash) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return NextResponse.json({ error: "Invalid" }, { status: 401 });
  return withAdminCookie(NextResponse.json({ ok: true }));
}
