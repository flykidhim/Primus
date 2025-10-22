// app/api/admin/debug/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // stops static evaluation assumptions

export async function GET() {
  const raw = process.env.ADMIN_PASSWORD_BCRYPT ?? "";
  const value = raw.trim().replace(/^"+|"+$/g, "");
  return Response.json({
    length: value.length,
    starts: value.slice(0, 7),
    ends: value.slice(-5),
    hasPLAINTEXT: value.startsWith("PLAINTEXT:"),
  });
}
