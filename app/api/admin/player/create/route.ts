// app/api/admin/player/create/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

/**
 * POST body: {
 *   name: string; position: string; number: number | string;
 *   nationality?: string; heightCm?: number | string;
 *   bio?: string; photoUrl?: string;
 * }
 * NOTE: You already have POST /api/admin/players. This is a legacy shim.
 */
export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const b = await req.json().catch(() => ({}));
    if (!b?.name || !b?.position || b?.number == null) {
      return NextResponse.json(
        { error: "Missing name/position/number" },
        { status: 400 }
      );
    }

    const created = await prisma.player.create({
      data: {
        name: String(b.name),
        position: String(b.position),
        number: Number(b.number),
        nationality: b.nationality ? String(b.nationality) : null,
        heightCm:
          b.heightCm !== undefined && b.heightCm !== ""
            ? Number(b.heightCm)
            : null,
        bio: b.bio ? String(b.bio) : null,
        photoUrl: b.photoUrl ? String(b.photoUrl) : null,
      },
    });

    return NextResponse.json({ player: created });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Create failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
