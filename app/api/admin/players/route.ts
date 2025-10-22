// app/api/admin/players/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const players = await prisma.player.findMany({ orderBy: { number: "asc" } });
  return NextResponse.json({ players });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const created = await prisma.player.create({
    data: {
      name: b.name,
      position: b.position,
      number: Number(b.number),
      nationality: b.nationality || null,
      heightCm: b.heightCm ? Number(b.heightCm) : null,
      bio: b.bio || null,
      photoUrl: b.photoUrl || null,
    },
  });
  return NextResponse.json({ player: created });
}
