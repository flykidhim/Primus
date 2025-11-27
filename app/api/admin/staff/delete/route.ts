// app/api/admin/staff/delete/route.ts
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
    const id = String(form.get("id") || "");

    if (!id) {
      return NextResponse.json({ error: "Missing staff id" }, { status: 400 });
    }

    await prisma.staff.delete({ where: { id } });

    return NextResponse.redirect(new URL("/admin/staff", req.url), 303);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to delete staff", message: e?.message },
      { status: 500 }
    );
  }
}
