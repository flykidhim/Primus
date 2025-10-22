// app/api/admin/player/update/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

/**
 * Legacy update shim.
 * Method: POST
 * Body: {
 *   id: string;              // required
 *   name?: string;
 *   position?: string;       // "GK" | "DF" | "MF" | "FW" (free text accepted)
 *   number?: number|string;
 *   nationality?: string|null;
 *   heightCm?: number|string|null;
 *   bio?: string|null;
 *   photoUrl?: string|null;
 * }
 *
 * NOTE: Canonical route already exists:
 *   PUT /api/admin/players/[id]
 */
export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const b = await req.json().catch(() => ({} as any));
    const id = String(b?.id ?? "");
    if (!id) {
      return NextResponse.json({ error: "Missing player id" }, { status: 400 });
    }

    // Build a minimal, safe update payload
    const data: any = {};
    if (b.name !== undefined) data.name = String(b.name);
    if (b.position !== undefined) data.position = String(b.position);
    if (b.number !== undefined) data.number = Number(b.number);
    if (b.nationality !== undefined)
      data.nationality = b.nationality ? String(b.nationality) : null;
    if (b.heightCm !== undefined && b.heightCm !== "")
      data.heightCm = b.heightCm == null ? null : Number(b.heightCm);
    if (b.bio !== undefined) data.bio = b.bio ? String(b.bio) : null;
    if (b.photoUrl !== undefined)
      data.photoUrl = b.photoUrl ? String(b.photoUrl) : null;

    const updated = await prisma.player.update({ where: { id }, data });
    return NextResponse.json({ player: updated });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Update failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
