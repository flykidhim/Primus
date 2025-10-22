// app/api/admin/article/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const created = await prisma.article.create({
    data: {
      title: String(body.title ?? ""),
      slug: String(body.slug ?? ""),
      excerpt: body.excerpt ?? null,
      content: String(body.content ?? ""),
      coverUrl: body.coverUrl ?? null,
      category: body.category ?? "Club News",
      published: body.published ?? true,
    },
  });
  return NextResponse.json({ article: created });
}
