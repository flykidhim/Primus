import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ← await the params
  const body = await req.json();
  const updated = await prisma.player.update({
    where: { id },
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
  return NextResponse.json({ player: updated });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ← await the params
  await prisma.player.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
