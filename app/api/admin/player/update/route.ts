// app/api/admin/player/update/route.ts
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

    const id = String(body.id ?? "");
    if (!id)
      return NextResponse.json({ error: "Missing player id" }, { status: 400 });

    const data: any = {};
    if (body.name !== undefined) data.name = String(body.name);
    if (body.position !== undefined) data.position = String(body.position);
    if (body.number !== undefined) data.number = Number(body.number);
    if (body.nationality !== undefined)
      data.nationality = body.nationality ? String(body.nationality) : null;
    if (body.heightCm !== undefined)
      data.heightCm = body.heightCm ? Number(body.heightCm) : null;
    if (body.bio !== undefined) data.bio = body.bio ? String(body.bio) : null;
    if (body.photoUrl !== undefined)
      data.photoUrl = body.photoUrl ? String(body.photoUrl) : null;

    const player = await prisma.player.update({
      where: { id },
      data,
      select: { id: true },
    });

    return NextResponse.json({ player });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to update player", message: e?.message },
      { status: 500 }
    );
  }
}
