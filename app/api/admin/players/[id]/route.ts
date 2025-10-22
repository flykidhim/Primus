// app/api/admin/players/[id]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Ctx) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const updated = await prisma.player.update({
    where: { id },
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
  return NextResponse.json({ player: updated });
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.player.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
