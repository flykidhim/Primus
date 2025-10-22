import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const productId = String(form.get("productId") || "");
  const url = String(form.get("url") || "");
  const alt = String(form.get("alt") || "");
  const sort = Number(form.get("sort") || 0);
  if (!productId || !url)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  await prisma.productImage.create({ data: { productId, url, alt, sort } });
  return NextResponse.redirect(
    new URL(
      `/admin/products/${productId}`,
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    )
  );
}
