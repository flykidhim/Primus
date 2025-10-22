// app/api/admin/article/create/route.ts
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

    // Accept JSON **or** form-data (your admin UI can send either)
    const contentType = req.headers.get("content-type") || "";
    let payload: any = {};
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
    }

    const title = String(payload.title ?? "").trim();
    const slug = String(payload.slug ?? "").trim();
    const content = String(payload.content ?? "").trim();
    const excerpt = payload.excerpt ? String(payload.excerpt) : null;
    const coverUrl = payload.coverUrl ? String(payload.coverUrl) : null;
    const category = payload.category ? String(payload.category) : "Club News";
    const published =
      typeof payload.published === "string"
        ? payload.published === "true"
        : Boolean(payload.published ?? true);

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, content" },
        { status: 400 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverUrl,
        category,
        published,
      },
      select: { id: true, slug: true },
    });

    // Redirect to admin article detail (or list) – derive base from the incoming request
    const base = new URL(req.url);
    return NextResponse.redirect(
      new URL(`/admin/news/${article.slug}`, base.origin),
      303
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create article", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
