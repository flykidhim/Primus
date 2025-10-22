import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = String(form.get("id") || "");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const data: any = {};
  for (const [k, v] of form.entries()) if (k !== "id") data[k] = String(v);
  ["number", "heightCm", "appearances", "goals", "assists"].forEach((k) => {
    if (k in data) data[k] = Number(data[k] || 0);
  });
  const updated = await prisma.player.update({ where: { id }, data });
  return NextResponse.json(updated);
}
