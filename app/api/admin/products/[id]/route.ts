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
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      slug: body.slug,
      priceCents: Number(body.priceCents),
      stock: Number(body.stock),
      description: body.description || null,
      imageUrl: body.imageUrl || null,
    },
  });
  return NextResponse.json({ product });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ← await the params
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
