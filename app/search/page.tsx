export const metadata = { title: "Search — Primus FC" };

import Link from "next/link";
import { getArticles, getPlayers, getProducts } from "@/lib/repos";

type SP = { q?: string };

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const sp = (await (searchParams ?? Promise.resolve({}))) as SP;
  const q = (sp.q ?? "").trim();
  const lc = q.toLowerCase();

  const [articles, players, products] = await Promise.all([
    getArticles(),
    getPlayers(),
    getProducts(),
  ]);

  const a = (articles || []).filter(
    (x: any) =>
      x.title?.toLowerCase().includes(lc) ||
      x.excerpt?.toLowerCase().includes(lc)
  );
  const p = (players || []).filter(
    (x: any) =>
      x.name?.toLowerCase().includes(lc) ||
      x.position?.toLowerCase().includes(lc)
  );
  const s = (products || []).filter(
    (x: any) =>
      x.name?.toLowerCase().includes(lc) ||
      x.description?.toLowerCase().includes(lc)
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Search</h1>
        <p className="text-white/70">Results for “{q || "…"}”</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">News</h2>
        {a.length === 0 && (
          <div className="text-white/60">No matching articles.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {a.map((n: any) => (
            <Link
              key={n.id}
              href={`/news/${n.slug}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              {n.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.coverUrl}
                  alt={n.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              )}
              <div className="p-3">
                <div className="font-semibold line-clamp-2">{n.title}</div>
                {n.excerpt && (
                  <div className="text-sm text-white/70 line-clamp-2">
                    {n.excerpt}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">Players</h2>
        {p.length === 0 && (
          <div className="text-white/60">No matching players.</div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {p.map((pl: any) => (
            <Link
              key={pl.id}
              href={`/team/${pl.id}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pl.photoUrl || "/media/placeholder.jpg"}
                alt={pl.name}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-3">
                <div className="font-semibold line-clamp-1">{pl.name}</div>
                <div className="text-sm text-white/70">
                  {pl.position}
                  {pl.nationality ? ` • ${pl.nationality}` : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">Shop</h2>
        {s.length === 0 && (
          <div className="text-white/60">No matching products.</div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {s.map((it: any) => (
            <Link
              key={it.id}
              href={`/shop/${it.slug}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.imageUrl || "/media/placeholder.jpg"}
                alt={it.name}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-3">
                <div className="font-medium line-clamp-1">{it.name}</div>
                <div className="text-sm text-white/70">
                  {(it.priceCents / 100).toLocaleString(undefined, {
                    style: "currency",
                    currency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
