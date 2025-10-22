// app/api/admin/article/create/route.ts
export const runtime = "nodejs"; // make sure we are NOT on Edge
export const dynamic = "force-dynamic"; // never prerender
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  try {
    // 1) Auth check FIRST (before reading body)
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2) Accept JSON or form-data (don’t assume one)
    const ct = req.headers.get("content-type") || "";
    let body: Record<string, any> = {};
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    }

    const title = String(body.title ?? "").trim();
    const content = String(body.content ?? "").trim();
    const excerpt = body.excerpt ? String(body.excerpt) : null;
    const coverUrl = body.coverUrl ? String(body.coverUrl) : null;
    const category = body.category ? String(body.category) : "Club News";
    let slug = String(body.slug ?? "").trim();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, content" },
        { status: 400 }
      );
    }

    if (!slug) slug = slugify(title);

    // Ensure slug is unique (retry with suffix)
    let finalSlug = slug;
    for (let i = 2; i < 100; i++) {
      const exists = await prisma.article.findUnique({
        where: { slug: finalSlug },
      });
      if (!exists) break;
      finalSlug = `${slug}-${i}`;
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: finalSlug,
        content,
        excerpt,
        coverUrl,
        category,
        published: true,
      },
      select: { id: true, slug: true },
    });

    // 3) Redirect somewhere sensible (admin article list or public page)
    const base = new URL(req.url);
    // Adjust this path to your preferred destination:
    // - Admin list:   /admin/news
    // - Public page:  /news/[slug]
    return NextResponse.redirect(
      new URL(`/news/${article.slug}`, base.origin),
      303
    );
  } catch (e: any) {
    // Never throw during build — always respond with JSON
    return NextResponse.json(
      { error: "Failed to create article", message: e?.message },
      { status: 500 }
    );
  }
}
