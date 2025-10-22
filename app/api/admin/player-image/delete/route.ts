import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") || "");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const img = await prisma.playerImage.delete({ where: { id } });
  return NextResponse.redirect(
    new URL(
      `/admin/players/${img.playerId}`,
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    )
  );
}
