import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlayerById } from "@/lib/repos";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getPlayerById(id);
  if (!p) return notFound();

  // Calculate additional stats
  const goalsPerGame =
    p.appearances > 0 ? (p.goals / p.appearances).toFixed(2) : "0.00";
  const assistsPerGame =
    p.appearances > 0 ? (p.assists / p.appearances).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/team"
          className="group inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Squad
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Player Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
                {p.photoUrl ? (
                  <Image
                    src={p.photoUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="grid place-items-center h-full bg-slate-800 text-white/50">
                    <svg
                      className="w-20 h-20"
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

                {/* Jersey Number */}
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center shadow-2xl">
                  <span className="text-2xl font-black text-black">
                    #{p.number}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">
                    {p.appearances}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">
                    Apps
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">
                    {p.goals}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">
                    Goals
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-black text-brand-gold">
                    {p.assists}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mt-1">
                    Assists
                  </div>
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">
                  <span className="text-brand-gold">#{p.number}</span> {p.name}
                </h1>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-semibold text-sm">
                    {p.position}
                  </span>
                  {p.nationality && (
                    <span className="px-4 py-2 rounded-full bg-white/5 text-white border border-white/10 font-semibold text-sm">
                      {p.nationality}
                    </span>
                  )}
                  {p.heightCm && (
                    <span className="px-4 py-2 rounded-full bg-white/5 text-white border border-white/10 font-semibold text-sm">
                      {p.heightCm} cm
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              {p.bio && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/80 leading-relaxed">
                    {p.bio}
                  </p>
                </div>
              )}

              {/* Advanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/20 border border-white/10">
                  <div className="text-sm text-white/70 mb-1">Goals/Game</div>
                  <div className="text-xl font-black text-brand-gold">
                    {goalsPerGame}
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/20 border border-white/10">
                  <div className="text-sm text-white/70 mb-1">Assists/Game</div>
                  <div className="text-xl font-black text-brand-gold">
                    {assistsPerGame}
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/20 border border-white/10">
                  <div className="text-sm text-white/70 mb-1">Contribution</div>
                  <div className="text-xl font-black text-brand-gold">
                    {p.goals + p.assists}
                  </div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-purple-900/20 border border-white/10">
                  <div className="text-sm text-white/70 mb-1">Experience</div>
                  <div className="text-xl font-black text-brand-gold">
                    {p.appearances}+
                  </div>
                </div>
              </div>

              {/* Player Attributes */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Player Profile
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/70">Position</div>
                    <div className="font-semibold text-white">{p.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Jersey Number</div>
                    <div className="font-semibold text-white">#{p.number}</div>
                  </div>
                  {p.nationality && (
                    <div>
                      <div className="text-sm text-white/70">Nationality</div>
                      <div className="font-semibold text-white">
                        {p.nationality}
                      </div>
                    </div>
                  )}
                  {p.heightCm && (
                    <div>
                      <div className="text-sm text-white/70">Height</div>
                      <div className="font-semibold text-white">
                        {p.heightCm} cm
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {p.photos?.length ? (
        <section className="py-12 lg:py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-3">
                <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h2>
              <p className="text-white/70">
                Action shots and moments featuring {p.name}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {p.photos
                .slice()
                .sort((a: any, b: any) => (a.sort ?? 0) - (b.sort ?? 0))
                .map((img: any) => (
                  <div
                    key={img.id}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:scale-105"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Career Highlights */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-3">
                Career Highlights
              </h2>
              <p className="text-white/70">Key moments and achievements</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-brand-gold/10 to-yellow-400/10 border border-brand-gold/20">
                <div className="text-3xl font-black text-brand-gold mb-2">
                  {p.appearances}
                </div>
                <div className="text-white font-semibold">
                  Total Appearances
                </div>
              </div>
              <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-brand-gold/10 to-yellow-400/10 border border-brand-gold/20">
                <div className="text-3xl font-black text-brand-gold mb-2">
                  {p.goals}
                </div>
                <div className="text-white font-semibold">Goals Scored</div>
              </div>
              <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-brand-gold/10 to-yellow-400/10 border border-brand-gold/20">
                <div className="text-3xl font-black text-brand-gold mb-2">
                  {p.assists}
                </div>
                <div className="text-white font-semibold">Assists Provided</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
