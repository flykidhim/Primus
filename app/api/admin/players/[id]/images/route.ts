// app/api/admin/players/[id]/images/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Create a new image for a player.
 * Body JSON: { url: string, alt?: string, sort?: number }
 */
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // 👈 must await in Next 15
  const body = await req.json();

  if (!body?.url || typeof body.url !== "string") {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  const image = await prisma.playerImage.create({
    data: {
      playerId: id,
      url: body.url,
      alt: body.alt ?? null,
      sort: typeof body.sort === "number" ? body.sort : 0,
    },
  });

  return NextResponse.json({ image }, { status: 201 });
}

/**
 * Optional: list images for a player (handy for admin UI).
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // 👈 must await in Next 15
  const images = await prisma.playerImage.findMany({
    where: { playerId: id },
    orderBy: { sort: "asc" },
  });
  return NextResponse.json({ images });
}
