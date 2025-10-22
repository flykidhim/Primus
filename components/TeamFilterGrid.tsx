'use client';
import { useMemo, useState } from "react";

export type Player = {
  id: string;
  name: string;
  position: string; // GK | DF | MF | FW
  number: number;
  nationality?: string | null;
  heightCm?: number | null;
  bio?: string | null;
  photoUrl?: string | null;
  appearances: number;
  goals: number;
  assists: number;
};

const POS = ["ALL","GK","DF","MF","FW"] as const;

export default function TeamFilterGrid({ players }: { players: Player[] }) {
  const [q, setQ] = useState("");
  const [pos, setPos] = useState<typeof POS[number]>("ALL");
  const [sort, setSort] = useState<"number"|"name"|"apps"|"goals">("number");

  const filtered = useMemo(() => {
    let list = players;
    if (pos !== "ALL") list = list.filter(p => p.position === pos);
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(t) || (p.nationality || "").toLowerCase().includes(t));
    }
    list = [...list].sort((a,b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "apps") return (b.appearances ?? 0) - (a.appearances ?? 0);
      if (sort === "goals") return (b.goals ?? 0) - (a.goals ?? 0);
      return a.number - b.number;
    });
    return list;
  }, [players, q, pos, sort]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {POS.map(p => (
            <button key={p}
              onClick={() => setPos(p)}
              className={
                "px-3 py-1.5 rounded-full text-sm border " +
                (pos === p ? "bg-primary text-white" : "bg-white hover:bg-gray-50")
              }>
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search name or nationality"
            className="border rounded-xl px-3 py-2 text-sm w-56"
          />
          <select value={sort} onChange={e => setSort(e.target.value as any)} className="border rounded-xl px-3 py-2 text-sm">
            <option value="number">Sort: Number</option>
            <option value="name">Sort: Name</option>
            <option value="apps">Sort: Appearances</option>
            <option value="goals">Sort: Goals</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(p => (
          <a key={p.id} href={`/team/${p.id}`} className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md">
            {p.photoUrl ? (
              <img src={p.photoUrl} alt={p.name} className="h-56 sm:h-60 w-full object-cover group-hover:scale-[1.02] transition-transform" />
            ) : <div className="h-56 sm:h-60 w-full bg-gray-100" />}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-xl bg-black/70 text-white text-xs">#{p.number} • {p.position}</span>
            </div>
            <div className="p-4">
              <div className="text-base sm:text-lg font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{p.appearances} apps • {p.goals} goals • {p.assists} ast</div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-sm text-gray-500 py-8">No players match your filters.</div>
      )}
    </div>
  );
}
