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

  // Calculate team stats
  const teamStats = {
    totalGoals: list.reduce((sum, player) => sum + (player.goals || 0), 0),
    totalAssists: list.reduce((sum, player) => sum + (player.assists || 0), 0),
    totalAppearances: list.reduce(
      (sum, player) => sum + (player.appearances || 0),
      0
    ),
    averageAge: 24, // This would come from your data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                Meet The Warriors
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Primus{" "}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                Squad
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              The exceptional talents driving our mission forward. From
              grassroots to greatness, meet the players who embody the Primus
              spirit.
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-8 bg-black/40 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {list.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Players
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {teamStats.totalGoals}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Total Goals
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {teamStats.totalAssists}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Total Assists
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl lg:text-3xl font-black text-brand-gold">
                {teamStats.averageAge}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                Avg Age
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            {/* Position Filters */}
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
                    className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "border-brand-gold bg-brand-gold text-black shadow-lg shadow-brand-gold/30"
                        : "border-white/20 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/30"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
            </div>

            {/* Search */}
            <form action="/team" className="flex gap-3">
              <div className="relative">
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Search players..."
                  className="pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/20 placeholder:text-white/60 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/30 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input type="hidden" name="pos" value={pos} />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-brand-gold/30"
              >
                Search
              </button>
            </form>
          </div>

          {/* Players Grid */}
          {list.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {list.map((p) => (
                <Link
                  key={p.id}
                  href={`/team/${p.id}`}
                  className="group block transform hover:scale-105 transition-all duration-500"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 group-hover:border-brand-gold/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-gold/20">
                    {/* Player Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {p.photoUrl ? (
                        <Image
                          src={p.photoUrl}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="grid place-items-center h-full bg-slate-800 text-white/50">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Player Number */}
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center text-lg font-black shadow-lg transform group-hover:scale-110 transition-transform">
                        {p.number}
                      </div>

                      {/* Position Badge */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
                          {p.position}
                        </div>
                      </div>

                      {/* Stats Overlay on Hover */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm">
                            <div className="text-xs text-white/70">Apps</div>
                            <div className="text-sm font-bold text-white">
                              {p.appearances}
                            </div>
                          </div>
                          <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm">
                            <div className="text-xs text-white/70">Goals</div>
                            <div className="text-sm font-bold text-white">
                              {p.goals}
                            </div>
                          </div>
                          <div className="bg-black/80 rounded-lg p-2 backdrop-blur-sm">
                            <div className="text-xs text-white/70">Assists</div>
                            <div className="text-sm font-bold text-white">
                              {p.assists}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="p-4 lg:p-6">
                      <div className="text-center">
                        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-brand-gold transition-colors">
                          {p.name}
                        </h3>
                        <div className="flex items-center justify-center gap-3 text-sm text-white/70">
                          <span>{p.position}</span>
                          {p.nationality && (
                            <>
                              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                              <span>{p.nationality}</span>
                            </>
                          )}
                          {p.heightCm && (
                            <>
                              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                              <span>{p.heightCm}cm</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Players Found
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                No players match your current filters. Try adjusting your search
                criteria or browse all players.
              </p>
            </div>
          )}

          {/* Team Composition Info */}
          {list.length > 0 && (
            <div className="mt-16 p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-slate-800 to-purple-900/30 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Squad Composition
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {POS.filter((p) => p !== "All").map((position) => {
                  const count = list.filter(
                    (p) => p.position === position
                  ).length;
                  return (
                    <div key={position} className="text-center">
                      <div className="text-3xl font-black text-brand-gold mb-2">
                        {count}
                      </div>
                      <div className="text-white/70 text-sm uppercase tracking-wider">
                        {position}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
