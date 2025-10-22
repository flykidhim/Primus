// app/api/admin/product/create/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ct = req.headers.get("content-type") || "";
    let body: any = {};
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    }

    const name = String(body.name ?? "").trim();
    const slug = String(body.slug ?? "").trim();
    const priceCents = Number(body.priceCents ?? 0);
    const stock = Number(body.stock ?? 0);
    const description = body.description ? String(body.description) : null;
    const imageUrl = body.imageUrl ? String(body.imageUrl) : null;

    if (!name || !slug || !Number.isFinite(priceCents)) {
      return NextResponse.json(
        { error: "Missing/invalid fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: { name, slug, priceCents, stock, description, imageUrl },
      select: { id: true, slug: true },
    });

    // Redirect to product admin page
    const base = new URL(req.url);
    return NextResponse.redirect(
      new URL(`/admin/products/${product.id}`, base.origin),
      303
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create product", message: e?.message },
      { status: 500 }
    );
  }
}
