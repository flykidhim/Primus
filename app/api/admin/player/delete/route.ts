// app/api/admin/player/delete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

/**
 * POST body: { id: string }
 * NOTE: You already have DELETE /api/admin/players/[id].
 * This is a legacy shim.
 */
export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json().catch(() => ({}));
    const id = String(body?.id ?? "");
    if (!id) {
      return NextResponse.json({ error: "Missing player id" }, { status: 400 });
    }

    await prisma.player.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Delete failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
