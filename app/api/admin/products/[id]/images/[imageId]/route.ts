// app/api/admin/products/[id]/images/[imageId]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string; imageId: string }> };

export async function DELETE(req: Request, ctx: Ctx) {
  if (!(await isAdminRequest(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { imageId } = await ctx.params;
  await prisma.productImage.delete({ where: { id: imageId } });
  return NextResponse.json({ ok: true });
}
