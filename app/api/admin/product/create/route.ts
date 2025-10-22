// app/api/admin/product/create/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

/**
 * Legacy create shim.
 * Method: POST
 * Body: {
 *   name: string;            // required
 *   slug: string;            // required (unique)
 *   priceCents: number|string; // required
 *   stock?: number|string;
 *   description?: string|null;
 *   imageUrl?: string|null;
 * }
 *
 * NOTE: Canonical route already exists:
 *   POST /api/admin/products
 */
export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const b = await req.json().catch(() => ({} as any));
    if (!b?.name || !b?.slug || b?.priceCents == null) {
      return NextResponse.json(
        { error: "Missing name/slug/priceCents" },
        { status: 400 }
      );
    }

    const created = await prisma.product.create({
      data: {
        name: String(b.name),
        slug: String(b.slug),
        priceCents: Number(b.priceCents),
        stock: b.stock != null ? Number(b.stock) : 0,
        description: b.description ? String(b.description) : null,
        imageUrl: b.imageUrl ? String(b.imageUrl) : null,
      },
    });

    return NextResponse.json({ product: created });
  } catch (e: any) {
    // Handle unique slug errors nicely
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Create failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
