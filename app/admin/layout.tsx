"use client";

import "./admin.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // For the login route, render a bare page without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/players", label: "Players" },
    { href: "/admin/matches", label: "Matches" },
    { href: "/admin/media", label: "Media" },
    { href: "/admin/articles", label: "Articles" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/staff", label: "Staff" }, // ✅ new tab
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="grid lg:grid-cols-[260px_1fr] min-h-[calc(100vh-6rem)] gap-6">
        <aside className="glass rounded-2xl p-4 h-fit lg:sticky lg:top-20">
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Primus FC
            </div>
            <div className="text-sm font-semibold text-white/90">
              Admin Control
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <form
              action="/api/admin/logout"
              method="post"
              className="mt-4 pt-3 border-t border-white/10"
            >
              <button
                type="submit"
                className="px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10 w-full text-left"
              >
                Log out
              </button>
            </form>
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}
