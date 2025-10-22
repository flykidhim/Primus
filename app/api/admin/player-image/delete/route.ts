export const runtime = "nodejs"; // force Node, not Edge
export const dynamic = "force-dynamic"; // don’t prerender
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

type Body = { imageId?: string };

export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { imageId } = (await req.json()) as Body;
    if (!imageId) {
      return NextResponse.json({ error: "imageId required" }, { status: 400 });
    }

    await prisma.playerImage.delete({ where: { id: String(imageId) } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Never throw during build – return JSON instead
    return NextResponse.json(
      { error: "Delete failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
