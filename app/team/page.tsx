import Link from "next/link";
import Image from "next/image";
import { getPlayersFiltered } from "@/lib/player-source";

const POS = ["All", "GK", "DF", "MF", "FW"] as const;

export const metadata = { title: "Team — Primus FC" };

export default async function TeamPage({
  searchParams,
}: {
  searchParams?: Promise<{ pos?: string; q?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const pos = (sp.pos ?? "All") as (typeof POS)[number];
  const q = sp.q ?? "";
  const list = await getPlayersFiltered(pos === "All" ? undefined : pos, q);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Squad</h1>
        <form action="/team" className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search…"
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 placeholder:text-white/60"
          />
          <input type="hidden" name="pos" value={pos} />
          <button className="btn-primary">Search</button>
        </form>
      </header>

      <div className="flex flex-wrap gap-2">
        {POS.map((p) => {
          const href =
            p === "All"
              ? `/team${q ? `?q=${encodeURIComponent(q)}` : ""}`
              : `/team?pos=${p}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
          const active = p === pos;
          return (
            <Link
              key={p}
              href={href}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                active
                  ? "border-brand-gold bg-brand-gold text-black"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {p}
            </Link>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((p) => (
          <Link
            key={p.id}
            href={`/team/${p.id}`}
            className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <div className="relative aspect-[4/5]">
              {p.photoUrl ? (
                <Image
                  src={p.photoUrl}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="grid place-items-center h-full text-white/50">
                  No image
                </div>
              )}
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 text-xs">
                #{p.number}
              </div>
            </div>
            <div className="p-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-white/70">
                {p.position} • {p.nationality ?? "—"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!list.length && (
        <div className="text-white/70">No players match your filters.</div>
      )}
    </div>
  );
}
