import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> } // Next 15: params is a Promise
) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ await params

  let body: any;
  try {
    body = await req.json(); // { url, alt?, sort? }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  const alt = typeof body.alt === "string" ? body.alt : null;
  const sort = typeof body.sort === "number" ? body.sort : 0;

  const image = await prisma.productImage.create({
    data: { productId: id, url, alt, sort },
  });

  return NextResponse.json({ image }, { status: 201 });
}
