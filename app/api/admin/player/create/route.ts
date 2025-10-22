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

    const ct = req.headers.get("content-type") || "";
    let body: any = {};
    if (ct.includes("application/json")) body = await req.json();
    else body = Object.fromEntries((await req.formData()).entries());

    const name = String(body.name ?? "").trim();
    const position = String(body.position ?? "").trim();
    const number = Number(body.number ?? 0);
    const nationality = body.nationality ? String(body.nationality) : null;
    const heightCm = body.heightCm ? Number(body.heightCm) : null;
    const bio = body.bio ? String(body.bio) : null;
    const photoUrl = body.photoUrl ? String(body.photoUrl) : null;

    if (!name || !position || !Number.isFinite(number)) {
      return NextResponse.json(
        { error: "Missing/invalid fields" },
        { status: 400 }
      );
    }

    const player = await prisma.player.create({
      data: { name, position, number, nationality, heightCm, bio, photoUrl },
      select: { id: true },
    });

    const base = new URL(req.url);
    return NextResponse.redirect(
      new URL(`/admin/players/${player.id}`, base.origin),
      303
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create player", message: e?.message },
      { status: 500 }
    );
  }
}
