import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const players = await prisma.player.findMany({ orderBy: { number: "asc" } });
  return NextResponse.json({ players });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const created = await prisma.player.create({
    data: {
      name: body.name,
      position: body.position,
      number: Number(body.number),
      nationality: body.nationality || null,
      heightCm: body.heightCm ? Number(body.heightCm) : null,
      bio: body.bio || null,
      photoUrl: body.photoUrl || null,
    },
  });
  return NextResponse.json({ player: created });
}
