// app/api/admin/player-image/delete/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ct = req.headers.get("content-type") || "";
    let body: any = {};
    if (ct.includes("application/json")) body = await req.json();
    else body = Object.fromEntries((await req.formData()).entries());

    const imageId = String(body.imageId ?? "");
    if (!imageId)
      return NextResponse.json({ error: "Missing imageId" }, { status: 400 });

    await prisma.playerImage.delete({ where: { id: imageId } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to delete player image", message: e?.message },
      { status: 500 }
    );
  }
}
