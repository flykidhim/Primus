import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string; imageId: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageId } = await context.params; // ← await the params
  await prisma.productImage.delete({ where: { id: imageId } });
  return NextResponse.json({ ok: true });
}
