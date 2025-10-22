// app/api/admin/products/[id]/route.ts
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
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: b.name,
      slug: b.slug,
      priceCents: Number(b.priceCents),
      stock: Number(b.stock),
      description: b.description || null,
      imageUrl: b.imageUrl || null,
    },
  });
  return NextResponse.json({ product: updated });
}

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
