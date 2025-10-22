// app/api/admin/match/create/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isAdminRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const b = await req.json();
  const created = await prisma.match.create({
    data: {
      date: new Date(b.date ?? Date.now()),
      competition: String(b.competition ?? ""),
      home: String(b.home ?? ""),
      away: String(b.away ?? ""),
      venue: b.venue ? String(b.venue) : null,
      status: String(b.status ?? "SCHEDULED"),
      homeScore: Number(b.homeScore ?? 0),
      awayScore: Number(b.awayScore ?? 0),
      report: b.report ? String(b.report) : null,
    },
  });

  return NextResponse.json({ match: created }, { status: 201 });
}
