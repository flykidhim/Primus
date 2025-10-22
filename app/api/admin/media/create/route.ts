// app/api/admin/media/create/route.ts
export const runtime = "nodejs"; // force Node (not Edge)
export const dynamic = "force-dynamic"; // don't try to prerender
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  // AUTH (always pass req)
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body only inside handler (never at module scope)
  const body = await req.json();
  // Expecting: { title, type, url, posterUrl?, category?, description?, tags?[] }
  const created = await prisma.media.create({
    data: {
      title: String(body.title ?? ""),
      type: String(body.type ?? "photo"),
      url: String(body.url ?? ""),
      // Optional fields
      ...(body.posterUrl ? { posterUrl: String(body.posterUrl) } : {}),
      ...(body.category ? { category: String(body.category) } : {}),
      ...(body.description ? { description: String(body.description) } : {}),
      // If your schema has 'tags' as string[], otherwise remove
      ...(Array.isArray(body.tags) ? { tags: body.tags as string[] } : {}),
    },
  });

  return NextResponse.json({ media: created }, { status: 201 });
}
