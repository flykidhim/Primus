import "./admin.css";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[260px_1fr] min-h-[calc(100vh-4rem)] gap-6">
      <aside className="glass rounded-2xl p-4 h-fit lg:sticky lg:top-20">
        <div className="text-sm font-semibold mb-3 text-white/80">Admin</div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin"
            className="px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/players"
            className="px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Players
          </Link>
          <Link
            href="/admin/products"
            className="px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Products
          </Link>
          <form action="/api/admin/logout" method="post" className="mt-2">
            <button className="px-3 py-2 rounded-lg hover:bg-white/10 w-full text-left">
              Log out
            </button>
          </form>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
