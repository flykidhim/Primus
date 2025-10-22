import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const data: any = {};
  for (const [k, v] of form.entries()) data[k] = String(v);
  // Coerce numeric fields
  Object.keys(data).forEach(k => { if (/^(number|heightCm|homeScore|awayScore|priceCents|stock)$/.test(k)) data[k] = Number(data[k] || 0); });
  if (data.date) data.date = new Date(data.date);
  const created = await (prisma as any).article.create({ data });
  return NextResponse.json(created);
}
