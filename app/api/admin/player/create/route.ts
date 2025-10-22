// app/api/admin/player/create/route.ts
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

    // Accepts either JSON or form-data. Pick ONE flow in your UI; both supported here.
    const contentType = req.headers.get("content-type") || "";
    let payload: any = {};
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
    }

    const created = await prisma.player.create({
      data: {
        name: String(payload.name ?? ""),
        position: String(payload.position ?? "FW"),
        number: Number(payload.number ?? 0),
        nationality: payload.nationality ? String(payload.nationality) : null,
        heightCm:
          payload.heightCm !== undefined &&
          String(payload.heightCm).trim() !== ""
            ? Number(payload.heightCm)
            : null,
        bio: payload.bio ? String(payload.bio) : null,
        photoUrl: payload.photoUrl ? String(payload.photoUrl) : null,
      },
    });

    const base = new URL(req.url);
    // Go to the player detail page in admin
    return NextResponse.redirect(
      new URL(`/admin/players/${created.id}`, base.origin),
      303
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create player", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
