// app/api/admin/products/[id]/images/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Ctx) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json(); // { url, alt, sort }
  const created = await prisma.productImage.create({
    data: {
      productId: id,
      url: body.url,
      alt: body.alt || null,
      sort: body.sort ?? 0,
    },
  });
  return NextResponse.json({ image: created });
}
