// app/api/admin/product-image/create/route.ts
export const runtime = "nodejs"; // ✅ keep off Edge (bcrypt/crypto/Prisma friendly)
export const dynamic = "force-dynamic"; // ✅ don't prerender this API at build time
export const revalidate = 0; // ✅ always dynamic

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 🔐 Require admin
    if (!(await isAdminRequest(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📨 Read form-data safely
    const form = await req.formData();
    const productId = String(form.get("productId") ?? "");
    const url = String(form.get("url") ?? "");
    const alt = form.get("alt");
    const sortRaw = form.get("sort");

    // 🧹 Normalize/validate fields
    if (!productId || !url) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const sort =
      sortRaw === null || sortRaw === undefined || String(sortRaw).trim() === ""
        ? 0
        : Number(sortRaw);

    // 🗄️ Write to DB
    await prisma.productImage.create({
      data: {
        productId,
        url,
        alt: alt ? String(alt) : null,
        sort: Number.isFinite(sort) ? sort : 0,
      },
    });

    // 🔁 Redirect back to the product page
    // Use the request URL as base so we don't rely on env vars at build time
    const base = new URL(req.url);
    const redirectTo = new URL(
      `/admin/products/${productId}`,
      `${base.origin}/`
    );
    return NextResponse.redirect(redirectTo, 303);
  } catch (e: any) {
    // Nice handling for common Prisma errors
    if (e?.code === "P2003") {
      // foreign key fails: productId not found
      return NextResponse.json(
        { error: "Invalid productId (not found)." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create image", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
