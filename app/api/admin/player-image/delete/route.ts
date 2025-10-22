// app/api/admin/player-image/delete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

/**
 * POST body: { imageId: string }
 * NOTE: Your canonical route is DELETE /api/admin/players/[id]/images/[imageId].
 * This is a legacy shim.
 */
export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json().catch(() => ({}));
    const imageId = String(body?.imageId ?? "");
    if (!imageId) {
      return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
    }

    await prisma.playerImage.delete({ where: { id: imageId } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Delete failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
