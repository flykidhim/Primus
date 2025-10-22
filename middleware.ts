// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  // Allow hitting the login page without a cookie
  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const hasCookie = !!req.cookies.get("primus_admin")?.value;
  if (!hasCookie) {
    const login = new URL("/admin/login", req.url);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}
