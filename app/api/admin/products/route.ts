import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const created = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      priceCents: Number(body.priceCents),
      stock: Number(body.stock),
      description: body.description || null,
      imageUrl: body.imageUrl || null,
    },
  });
  return NextResponse.json({ product: created });
}
