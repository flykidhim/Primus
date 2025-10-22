// app/api/admin/article/create/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const b = await req.json();
  const created = await prisma.article.create({
    data: {
      title: String(b.title ?? ""),
      slug: String(b.slug ?? ""),
      excerpt: b.excerpt ? String(b.excerpt) : null,
      content: String(b.content ?? ""),
      coverUrl: b.coverUrl ? String(b.coverUrl) : null,
      category: String(b.category ?? "Club News"),
      published: Boolean(b.published ?? true),
    },
  });

  return NextResponse.json({ article: created }, { status: 201 });
}
