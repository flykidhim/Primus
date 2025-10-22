import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params; // 👈 await the async params
  const body = await req.json(); // { url, alt?, sort? }

  const created = await prisma.playerImage.create({
    data: {
      playerId: id,
      url: String(body.url),
      alt: body.alt ?? null,
      sort: Number(body.sort ?? 0),
    },
  });

  return NextResponse.json({ image: created });
}
