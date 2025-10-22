// app/api/admin/products/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const created = await prisma.product.create({
    data: {
      name: b.name,
      slug: b.slug,
      priceCents: Number(b.priceCents),
      stock: Number(b.stock),
      description: b.description || null,
      imageUrl: b.imageUrl || null,
    },
  });
  return NextResponse.json({ product: created });
}
