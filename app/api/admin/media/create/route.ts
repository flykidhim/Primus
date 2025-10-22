// app/api/admin/media/create/route.ts
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

    const title = String(body.title ?? "").trim();
    const type = String(body.type ?? "photo"); // 'photo' | 'video'
    const url = String(body.url ?? "").trim();
    const category = body.category ? String(body.category) : null;

    if (!title || !url) {
      return NextResponse.json(
        { error: "Missing fields: title, url" },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({
      data: { title, type, url, category },
      select: { id: true },
    });

    const base = new URL(req.url);
    return NextResponse.redirect(
      new URL(`/media/${media.id}`, base.origin),
      303
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create media", message: e?.message },
      { status: 500 }
    );
  }
}
