// app/api/admin/staff/create/route.ts
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

    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const role = String(form.get("role") || "").trim();
    const area = String(form.get("area") || "").trim() || null;
    const photoUrl = String(form.get("photoUrl") || "").trim() || null;
    const bio = String(form.get("bio") || "").trim() || null;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    await prisma.staff.create({
      data: { name, role, area, photoUrl, bio },
    });

    return NextResponse.redirect(new URL("/admin/staff", req.url), 303);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to create staff", message: e?.message },
      { status: 500 }
    );
  }
}
