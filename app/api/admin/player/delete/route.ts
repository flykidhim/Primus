// app/api/admin/player/delete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const playerId = String(form.get("playerId") ?? "");
    if (!playerId) {
      return NextResponse.json({ error: "Missing playerId" }, { status: 400 });
    }

    await prisma.player.delete({ where: { id: playerId } });

    // Redirect back to the players admin list
    const base = new URL(req.url);
    return NextResponse.redirect(new URL("/admin/players", base.origin), 303);
  } catch (e: any) {
    // Handle FK issues if you later relate images, etc.
    if (e?.code === "P2003") {
      return NextResponse.json(
        { error: "Cannot delete: player referenced by other records" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete player", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
